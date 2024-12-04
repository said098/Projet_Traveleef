from flask import Blueprint

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
    return ping_pong()

@route_bl.get('/get_users')
def users():
    return get_users()

@route_bl.get('/connexion')
def login():
    return connexion()

@route_bl.post('/inscription')
def register():
    return inscription()

@route_bl.post('/flight_emissions')
def flight_emissions():
    return get_flight_emissions()

@route_bl.post('/search_trips')
def search_for_trips():
    return search_trips()
