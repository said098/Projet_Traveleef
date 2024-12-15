from os import getenv

from flask import jsonify, Blueprint, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from src.utils.database import db
from src.utils.mappers.utilisateur_mappeur import mappeur
from bson.objectid import ObjectId
import requests
from datetime import datetime
from bson.json_util import dumps
import base64
from flask import request, jsonify
from serpapi import GoogleSearch




controller_bl = Blueprint('controller_bl', __name__)

def ping_pong():
    return jsonify('pong')

def get_users():
    users = db.utilisateur.find()
    return make_response(dumps(users), 200)

def connexion():
    auth = request.headers.get('Authorization')
    
    if not auth:
        return jsonify('Missing Authorization header'), 400
    
    auth = auth.split(' ')
    if len(auth) != 2:
        return jsonify('Invalid Authorization header'), 400
    
    if auth[0] != 'Basic':
        return jsonify('Invalid Authorization type'), 400
    
    auth = base64.b64decode(auth[1]).decode('utf-8').split(':')
    if len(auth) != 2:
        return jsonify('Invalid Authorization value'), 400
    
    user = mappeur({'id': None,'email': auth[0], 'password': auth[1]})
    user.get_id()
    
    if not user:
        return jsonify('Invalid email'), 400
    
    if not user.connexion():
        return jsonify('Invalid password'), 400
    
    user_id_str = str(user._id)
    access_token = create_access_token(identity=user_id_str)
    refresh_token = create_refresh_token(identity=user_id_str)
    
    resp = jsonify({'connexion': 'success'})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    
    return resp, 200

def inscription():
    data = request.get_json()
    prenom = data.get('prenom')
    nom = data.get('nom')
    datenaissance = data.get('datenaissance')
    email = data.get('email')
    tel = data.get('tel')
    password = data.get('pwd_confirm')

    if not prenom:
        return jsonify({'error': 'Missing prenom'}), 400
    if not nom:
        return jsonify({'error': 'Missing nom'}), 400
    if not datenaissance:
        return jsonify({'error': 'Missing datenaissance'}), 400
    if not email:
        return jsonify({'error': 'Missing email'}), 400
    if not password:
        return jsonify({'error': 'Missing password'}), 400
    if not tel:
        return jsonify({'error': 'Missing tel'}), 400

    user = mappeur({'id': None,'prenom': prenom,'nom': nom,'datenaissance': datenaissance,'email': email,'password': password,'tel': tel})

    user.inscription()

    return jsonify({'message': 'Inscription réussie'}), 200



def logout():
    response = make_response(jsonify({"message": "Déconnexion réussie"}), 200)
    response.set_cookie('csrf_access_token', '', expires=0)
    return response


def get_flight_emissions():
    data = request.get_json()
    if not data or 'flights' not in data:
        return jsonify({"error": "Format de requête invalide"}), 400

    # préparer les données pour l'API
    flights_data = []
    for flight in data['flights']:
        # vérifier que tous les champs requis sont présents
        required_fields = ['origin', 'destination', 'operatingCarrierCode', 'flightNumber', 'departureDate']
        if not all(field in flight for field in required_fields):
            return jsonify({"error": "Champs manquants dans le vol"}), 400

        # gérer la date de départ
        departure_date = flight['departureDate']
        if isinstance(departure_date, dict):

            pass
        elif isinstance(departure_date, str):
            # convertir la date en dictionnaire
            try:
                parsed_date = datetime.strptime(departure_date, '%Y-%m-%d')
                departure_date = {
                    'year': parsed_date.year,
                    'month': parsed_date.month,
                    'day': parsed_date.day
                }
            except ValueError:
                return jsonify({"error": "Format de date invalide"}), 400
        else:
            return jsonify({"error": "Format de date non reconnu"}), 400

        flight_data = {
            "origin": flight['origin'],
            "destination": flight['destination'],
            "operatingCarrierCode": flight['operatingCarrierCode'],
            "flightNumber": flight['flightNumber'],
            "departureDate": departure_date
        }
        flights_data.append(flight_data)

    payload = {"flights": flights_data}

    # appeler l'API travel impact model
    url = f"https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key={getenv('GOOGLE_API_KEY')}"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": response.text}), response.status_code



def search_trips():
    try:
        # récupération des données de la requête
        data = request.get_json()
        print("Filtres reçus :", data)

        # paramètres obligatoires
        departure_id = data.get('departure_id')
        arrival_id = data.get('arrival_id')
        outbound_date = data.get('outbound_date')
        return_date = data.get('return_date')
        currency = data.get('currency', 'USD')
        hl = data.get('hl', 'en')

        if not all([departure_id, arrival_id, outbound_date]):
            return jsonify({"error": "Les champs 'departure_id', 'arrival_id', et 'outbound_date' sont obligatoires."}), 400

        # construction des paramètres pour SerpAPI
        params = {
            "engine": "google_flights",
            "departure_id": departure_id,
            "arrival_id": arrival_id,
            "outbound_date": outbound_date,
            "currency": currency,
            "hl": hl,
            "api_key": getenv('SERPAPI_API_KEY')
        }

        if return_date:
            params["return_date"] = return_date

        # gestion des filtres
        if "max_price" in data and data["max_price"]:
            try:
                max_price = int(data["max_price"])
                if max_price < 0:
                    return jsonify({"error": "Le prix maximum doit être positif."}), 400
                params["max_price"] = max_price
            except ValueError:
                return jsonify({"error": "Le prix maximum doit être un entier valide."}), 400

        if data.get("include_airlines"):
            params["include_airlines"] = ",".join(data["include_airlines"])
        elif data.get("exclude_airlines"):
            params["exclude_airlines"] = ",".join(data["exclude_airlines"])

        if data.get("stops") is not None:
            try:
                stops = int(data["stops"])
                if stops not in [0, 1, 2, 3]:
                    return jsonify({"error": "Le paramètre 'stops' doit être entre 0 et 3."}), 400
                params["stops"] = stops
            except ValueError:
                return jsonify({"error": "Le paramètre 'stops' doit être un entier valide."}), 400

        # appel à l'API SerpAPI
        print("Paramètres envoyés à SerpAPI :", params)
        search = GoogleSearch(params)
        results = search.get_dict()

        # extraction des résultats
        flights = results.get("other_flights", [])
        if not flights:
            return jsonify({"message": "Aucun vol ne correspond à vos recherches.", "flights": []}), 200

        return jsonify({"flights": flights}), 200

    except Exception as e:
        print("Erreur :", str(e))
        return jsonify({"error": str(e)}), 500


def infoUser():
    user_id = get_jwt_identity()
    user = db.utilisateur.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.pop('password', None)
    user['_id'] = str(user['_id'])

    return jsonify(user), 200


def update_user():
    user_id = get_jwt_identity()
    data = request.json
    update_fields = {
        'nom': data.get('nom'),
        'prenom': data.get('prenom'),
        'datenaissance': data.get('datenaissance'),
        'tel': data.get('tel')
    }
    db.utilisateur.update_one({'_id': ObjectId(user_id)}, {'$set': update_fields})
    return jsonify({'message': 'Informations mises à jour avec succès'}), 200