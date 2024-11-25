from src.utils.database import db
from flask_bcrypt import Bcrypt
from bson import ObjectId

class Utilisateur:
    
    def __init__(self, id, email, password):
        self._id = id if id else ObjectId()
        self.email = email
        self.password = password
        
    
    def connexion(self):
        user = db.utilisateur.find_one({'email': self.email, 'password': self.password}) 
        if not user:
            return 'Invalid email or password'
        print('-------------------')
        print('--->', user['password'], '==', self.password)
        print('-------------------')
        
        if Bcrypt().check_password_hash(user['password'], self.password):
            return True
        else:
            return False
        
    def inscription(self):
        if db.utilisateur.find_one({'email': self.email}):
            return 'Email already exists'
        
        user = Utilisateur(None, self.email, self.hash_pwd())
        db.utilisateur.insert_one(user.__dict__)
        
        return 'User created'
    
    def hash_pwd(self):
        return Bcrypt().generate_password_hash(self.password).decode('utf-8')
    
    def get_id(self):
        self._id = db.utilisateur.find_one({'email': self.email})['_id']