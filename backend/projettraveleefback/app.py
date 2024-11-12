from flask import Flask, jsonify
from flask_cors import CORS
from app.routes import routes_bl

app = Flask(__name__)
CORS(app)


#Route pour récupérer tous les utilisateurs
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify("les utilisateurs sont la ")


@app.route('/', methods=['GET'])
def message():
    return jsonify("la route 5000 par défaut il marche")

app.config['DEBUG'] = True

app.register_blueprint(routes_bl)

if __name__ == '__main__': 
    app.run(host="0.0.0.0", port=5000)
