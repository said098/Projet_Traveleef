from pymongo import MongoClient
from os import getenv

# TODO: remettre pour le docker
# mongo_uri = getenv('MONGO_URI')
# mongo_db = getenv('MONGO_DB')

mongo_uri = 'mongodb+srv://pepito:bite@sae.devwrv4.mongodb.net/?retryWrites=true&w=majority'
mongo_db = 'Traveleef'

if not mongo_uri:
    raise ValueError('MONGO_URI is not set in .env file')
if not mongo_db:
    raise ValueError('MONGO_DB is not set in .env file')

mongo_client = MongoClient(mongo_uri)
db = mongo_client[mongo_db]