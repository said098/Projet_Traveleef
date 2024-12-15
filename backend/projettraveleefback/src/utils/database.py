from pymongo import MongoClient
from os import getenv

# TODO: remettre pour le docker
mongo_uri = getenv('MONGO_URI')
mongo_db = getenv('MONGO_DB')


if not mongo_uri:
    raise ValueError('MONGO_URI is not set in .env file')
if not mongo_db:
    raise ValueError('MONGO_DB is not set in .env file')

mongo_client = MongoClient(mongo_uri)
db = mongo_client[mongo_db]