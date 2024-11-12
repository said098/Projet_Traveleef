# Projet Traveleef
# Traveleef

## Description
Traveleef est une application web qui utilise Docker Compose pour déployer un front Angular, un back Python (Flask), et une base de données PostgreSQL. Ce projet est conçu pour être facilement déployable en local.

## Prérequis
- Docker
- Docker Compose

## Installation et Lancement
1. Clonez ce dépôt :
   git clone https://github.com/said098/Projet_Traveleef.git


## Démarrer le projet avec Docker

Une fois que tout est en place, pour démarrer le projet avec Docker :

1. Ouvrez un terminal et placez-vous dans le dossier où se trouve le fichier docker-compose.yml.

2. Lancez les conteneurs avec la commande suivante :
   docker-compose up --build

## juste pour tester que je le projet marche bien il faut creer lien suivant :
  http://localhost:4200/users



  
  
## Structure du projet
frontend/ : Contient le code Angular pour l'interface utilisateur.
backend/ : Contient le code Python Flask pour le backend.
initdb/ : Contient le fichier SQL d'initialisation pour PostgreSQL.
docker-compose.yml : Fichier de configuration Docker Compose.
secret.txt : Contient le mot de passe PostgreSQL utilisé comme secret Docker.



## Frontend
Pour démarrer le serveur Angular en local :
cd frontend/projettraveleef
npm install
ng serve


## Backend
Pour démarrer le serveur Flask en local :
cd backend/projettraveleefback
pip install -r requirements.txt
flask run



