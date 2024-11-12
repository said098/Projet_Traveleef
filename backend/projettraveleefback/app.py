from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#Route pour récupérer tous les utilisateurs
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify("les utilisateurs sont la ")


@app.route('/', methods=['GET'])
def message():
    return jsonify("la route 5000 par défaut il marche")

if __name__ == '__main__':
    if DATABASE_URL:  
       app.run(host="0.0.0.0", port=5000)
    else:
        print("Erreur : l'application ne peut pas démarrer sans configuration valide.")
