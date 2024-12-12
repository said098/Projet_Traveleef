from flask import jsonify, Blueprint, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from src.utils.database import db
from src.utils.mappers.utilisateur_mappeur import mappeur
from bson.objectid import ObjectId
import requests
from flask import jsonify, request
from datetime import datetime
from bson.json_util import dumps
from serpapi import GoogleSearch
import base64


GOOGLE_API_KEY = "AIzaSyBvCjx9LwR0tFvB1Kl_9iZRe28WmN-KDQg" #ajouter la clé ici
SERPAPI_API_KEY = "945cfb9cca45f989c0f533ed55dc04d49e33e5f12173a46e923dd5f49acf4523"


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
    url = f"https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key={GOOGLE_API_KEY}"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": response.text}), response.status_code


def search_trips():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Données de requête manquantes"}), 400

    required_fields = ["departure_id", "arrival_id", "outbound_date", "return_date", "currency", "hl"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Les champs suivants sont requis : {', '.join(required_fields)}"}), 400

    params = {
        "engine": "google_flights",
        "departure_id": data["departure_id"],    # ex : "CDG,ORY"
        "arrival_id": data["arrival_id"],        # ex : "LAX"
        "outbound_date": data["outbound_date"],  # format : "YYYY-MM-DD"
        "return_date": data["return_date"],      # format : "YYYY-MM-DD"
        "currency": data["currency"],            # ex : "USD"
        "hl": data["hl"],                        # langue : "en"
        "api_key": SERPAPI_API_KEY
    }

    # effectuer la recherche
    search = GoogleSearch(params)
    results = search.get_dict()

    # récupérer les vols
    flights = results.get("other_flights", [])


    return jsonify({"flights": flights})


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
