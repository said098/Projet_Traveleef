from flask import jsonify, Blueprint, make_response
from bson.json_util import dumps
from utils.database import db

controller_bl = Blueprint('controller_bl', __name__)

def ping_pong():
    return jsonify('pong')

def get_users():
    users = db.utilisateur.find()
    return make_response(dumps(users), 200)