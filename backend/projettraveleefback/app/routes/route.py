from flask import Blueprint
import controllers.controller as controller

routes_bl = Blueprint('routes', __name__, template_folder='')

@routes_bl.route('/users', methods=['GET'])
def ping():
    return controller.ping_pong()