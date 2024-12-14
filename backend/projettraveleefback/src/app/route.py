from flask import Blueprint, jsonify
import src.app.controller as controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

from .controller import (
    ping_pong,
    get_users,
    connexion,
    inscription,
    get_flight_emissions,
    search_trips
)

route_bl = Blueprint('route_bl', __name__)



@route_bl.get('/')
def ping():
    return controller.ping_pong()

@route_bl.get('/get_users')
def get_users():
    return controller.get_users()

@route_bl.get('/connexion')
def login():
    return controller.connexion()
    

@route_bl.post('/inscription')
def inscription():
    return controller.inscription()

@route_bl.route('/logout', methods=['POST'])
def logout():
    return controller.logout()

@route_bl.post('/flight_emissions')
def flight_emissions():
    return get_flight_emissions()

@route_bl.post('/search_trips')
def search_for_trips():
    return search_trips()

@route_bl.get('/route')
@jwt_required()
def recouperUserId():
    id = get_jwt_identity()
    return jsonify({'id': id, 'message': f'Bonjour utilisateur avec ID : {id}'}), 200




@route_bl.route('/infoPerso', methods=['GET'])
@jwt_required()
def infoUser():
    return controller.infoUser()



@route_bl.route('/update', methods=['PUT'])
@jwt_required()
def update_user():
    return controller.update_user()
