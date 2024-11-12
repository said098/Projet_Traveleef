from pymongo import MongoClient
import configparser

config = configparser.ConfigParser()
config.read('config/config.ini')

mongodb_client = MongoClient(config['DATABASE']['MONGO_URI'])
db = mongodb_client[config['DATABASE']['MONGO_DB']]