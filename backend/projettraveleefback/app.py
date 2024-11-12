from flask import Flask, jsonify
from flask_cors import CORS
from src.app.route import route_bl

app = Flask(__name__)
CORS(app)

app.config['DEBUG'] = True

app.register_blueprint(route_bl, url_prefix="/user")

if __name__ == '__main__': 
    app.run(host="0.0.0.0", port=5000)
