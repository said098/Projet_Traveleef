from flask import Blueprint, jsonify
import src.app.controller as controller
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

route_bl = Blueprint('route_bl', __name__)



@route_bl.get('/')
def ping():
    return controller.ping_pong()

@route_bl.get('/get_users')
def get_users():
    return controller.get_users()

@route_bl.get('/connexion')
def login():
    print('UWU')
    return controller.connexion()

@route_bl.post('/inscription')
def inscription():
    return controller.inscription()

@route_bl.route('/logout', methods=['POST'])
def logout():
    return controller.logout()



@route_bl.get('/route')
@jwt_required()
def recouperUserId():
    id = get_jwt_identity() 
    print("id de ", id)
    return jsonify({'id': id, 'message': f'Bonjour utilisateur avec ID : {id}'}), 200




@route_bl.route('/infoPerso', methods=['GET'])
@jwt_required()  
def infoUser():
    print("dans route infoPerson")
    return controller.infoUser()



@route_bl.route('/update', methods=['PUT'])
@jwt_required()
def update_user():
    print("dans route update")
    return controller.update_user()
