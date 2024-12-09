from src.app.model import Utilisateur

def mappeur (utilisateur_json):
    return Utilisateur(utilisateur_json['id'], utilisateur_json['email'], utilisateur_json['tel'], utilisateur_json['password']) if utilisateur_json else None