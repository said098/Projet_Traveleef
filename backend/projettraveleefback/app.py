from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_postgres_password():
    secret_path = '/run/secrets/postgres_password'
    try:
        with open(secret_path, 'r') as file:
            return file.read().strip()  
    except Exception as e:
        print(f"Erreur lors de la lecture du mot de passe : {e}")
        return None

POSTGRES_USER = os.environ.get('POSTGRES_USER', 'said11')  
POSTGRES_DB = os.environ.get('POSTGRES_DB', 'mongodb11')
POSTGRES_PASSWORD = get_postgres_password()

# Configuration de la connexion à la base de données
if POSTGRES_PASSWORD:
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    print("Mot de passe non trouvé, vérifiez les fichiers secrets.")
    DATABASE_URL = None

# Initialisation de SQLAlchemy
db = SQLAlchemy(app)

# Modèle de la table Users
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))

# Route pour récupérer tous les utilisateurs
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(users_list)


@app.route('/', methods=['GET'])
def message():
    return jsonify("la route 5000 par défaut il marche")

if __name__ == '__main__':
    if DATABASE_URL:  
       app.run(host="0.0.0.0", port=5000)
    else:
        print("Erreur : l'application ne peut pas démarrer sans configuration valide.")
