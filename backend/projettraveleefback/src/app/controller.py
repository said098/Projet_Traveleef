from flask import jsonify, Blueprint, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from bson.json_util import dumps
from ..utils.database import db
from ..utils.mappers.utilisateur_mappeur import mappeur
import requests
from flask import jsonify, request
from datetime import datetime



import base64


GOOGLE_API_KEY = "AIzaSyBvCjx9LwR0tFvB1Kl_9iZRe28WmN-KDQg" #ajouter la clé ici

controller_bl = Blueprint('controller_bl', __name__)

def ping_pong():
    return jsonify('pong')

def get_users():
    users = db.utilisateur.find()
    return make_response(dumps(users), 200)

def connexion():
    auth = request.headers.get('Authorization')
    
    if not auth:
        return jsonify('Missing Authorization header')
    
    auth = auth.split(' ')
    if len(auth) != 2:
        return jsonify('Invalid Authorization header')
    
    if auth[0] != 'Basic':
        return jsonify('Invalid Authorization type')
    
    auth = base64.b64decode(auth[1]).decode('utf-8').split(':')
    if len(auth) != 2:
        return jsonify('Invalid Authorization value')
    
    user = mappeur({'id': None,'email': auth[0], 'password': auth[1]})
    user.get_id()
    
    if not user:
        return jsonify('Invalid email')
    
    if not user.connexion():
        return jsonify('Invalid password')
    
    user_id_str = str(user._id)
    access_token = create_access_token(identity=user_id_str)
    refresh_token = create_refresh_token(identity=user_id_str)
    
    resp = jsonify({'connexion': 'success'})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    
    return resp
    
def inscription():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email:
        return jsonify('Missing email')
    
    if not password:
        return jsonify('Missing password')
    
    user = mappeur({'id': None, 'email': email, 'password': password}) 
    
    user.inscription()
    
    return jsonify('Inscription success')

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