from src.app.model import Utilisateur

def mappeur(utilisateur_json):
    if not utilisateur_json:
        return None
    return Utilisateur(
        id=utilisateur_json.get('id'),                
        prenom=utilisateur_json.get('prenom'),        
        nom=utilisateur_json.get('nom'),             
        datenaissance=utilisateur_json.get('datenaissance'),
        email=utilisateur_json.get('email'),         
        tel=utilisateur_json.get('tel'),             
        password=utilisateur_json.get('password')    
    )
