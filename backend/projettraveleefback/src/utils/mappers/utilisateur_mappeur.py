from src.app.model import Utilisateur

def mappeur(utilisateur_json):
    if not utilisateur_json:
        return None
    return Utilisateur(
        utilisateur_json.get('id'),               
        utilisateur_json.get('email'),            
        utilisateur_json.get('tel'),              
        utilisateur_json.get('password')          
    )