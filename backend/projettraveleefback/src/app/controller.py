from flask import jsonify, Blueprint, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from bson.json_util import dumps
from src.utils.database import db
from src.utils.mappers.utilisateur_mappeur import mappeur

import base64

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