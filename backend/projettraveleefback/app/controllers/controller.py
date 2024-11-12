from flask import jsonify

def ping_pong():
    return jsonify('pong')