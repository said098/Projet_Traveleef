from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from backend.projettraveleefback.src.app.route import route_bl

# from backend.projettraveleefback.src.app.route import route_bl


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['DEBUG'] = True

app.register_blueprint(route_bl, url_prefix="/user")

# app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY') TODO: remettre pour le docker
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_COOKIE_SECURE'] = False 
app.config['JWT_ACCESS_COOKIE_PATH'] = '/' # ça marche pas ['/user/secure', '/campagnes/secure']
app.config['JWT_REFRESH_COOKIE_PATH'] = '/user/refresh'
app.config['JWT_COOKIE_HTTPONLY'] = False  # Set cookies as HttpOnly
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

jwt = JWTManager(app)

if __name__ == '__main__': 
    app.run(host="0.0.0.0", port=5000)
