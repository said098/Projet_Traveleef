from flask import Blueprint, jsonify
import src.app.controller as controller

route_bl = Blueprint('route_bl', __name__)



@route_bl.get('/')
def ping():
    return controller.ping_pong()

@route_bl.get('/get_users')
def get_users():
    return controller.get_users()