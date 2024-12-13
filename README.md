# Projet Traveleef
# Description
Traveleef est une application web conçue pour simplifier l'expérience utilisateur grâce à une interface moderne et un backend robuste. Ce projet utilise Docker Compose pour déployer un front Angular, un back Python (Flask), et une base de données MongoDB, permettant un déploiement local rapide et simple.
# Prérequis

# Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

# Docker
Téléchargez et installez Docker depuis ce lien officiel.

# Docker Compose
Docker Compose est inclus avec Docker Desktop, sinon installez-le séparément en suivant les instructions ici.
# Installation et Lancement
# Étape 1 : Cloner le dépôt
Clonez le projet dans votre répertoire local :

git clone https://github.com/said098/Projet_Traveleef.git
cd Projet_Traveleef
# Étape 2 : Démarrer le projet avec Docker

Assurez-vous de vous placer dans le dossier contenant le fichier docker-compose.yml :
# cd Projet_Traveleef
Construisez et démarrez les conteneurs avec la commande :
# docker-compose up --build
# Étape 3 : Tester le projet
Une fois que les conteneurs sont démarrés, ouvrez votre navigateur et accédez à l'URL suivante pour vérifier que tout fonctionne :
http://localhost:4200/
Cette page devrait afficher l'écran d'accueil de Traveleef.

# Structure du projet
Le projet est organisé comme suit :
Projet_Traveleef/
│
├── .env                      # Variables d'environnement pour le projet
├── .gitignore                # Fichiers ignorés par Git
├── docker-compose.yml        # Fichier de configuration Docker Compose
├── README.md                 # Documentation du projet
│
├── frontend/                 # Répertoire du frontend Angular
│   ├── dockerfile            # Dockerfile pour construire l'image du frontend
│   ├── projettraveleef/      # Code source du frontend Angular
│   │   ├── src/              # Code principal de l'application Angular
│   │   ├── angular.json      # Configuration Angular
│   │   ├── package.json      # Dépendances du frontend
│   │   └── proxy.conf.json   # Configuration du proxy Angular
│   └── nginx/                # Configuration Nginx pour le frontend
│
├── backend/                  # Répertoire du backend Flask
│   ├── dockerfile            # Dockerfile pour construire l'image du backend
│   ├── requirements.txt      # Dépendances Python pour le backend
│   ├── projettraveleefback/  # Code source du backend Flask
│   │   ├── app.py            # Point d'entrée du backend Flask
│   │   └── src/              # Modules et logique du backend
│
└── .vscode/                  # Configuration VSCode (facultatif)




# Démarrage manuel (Sans Docker)
# Frontend
Pour démarrer le front Angular localement :

# 1 Naviguez dans le répertoire du front-end :
cd frontend/projettraveleef

# 2 Installez les dépendances :
npm install

# 3 Lancez le serveur Angular :
ng serve
# Backend 
# Pour démarrer le back-end Flask localement :
Naviguez dans le répertoire du back-end :
cd backend

# Installez les dépendances Python :

pip install -r requirements.txt

# Lancez le serveur Flask :

cd backend/projettraveleefback
Python app.py

# Auteur
Saidkamal Shinwari
Juba Chabane
Mathis Pierre
Imman Amaladasse





















