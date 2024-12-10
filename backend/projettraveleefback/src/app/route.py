from flask import Blueprint
import src.app.controller as controller

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
def register():
    return inscription()

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
