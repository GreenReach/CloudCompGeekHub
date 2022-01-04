from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

import pymongo as mongo

from ContentInfo import ContentInfoAPI
from constants import CONNECTION_STRING

app = Flask(__name__)
api = Api(app)
CORS(app)

class HelloWorld(Resource):
  def get(self):
    # client = mongo.MongoClient(CONNECTION_STRING)
    # db = client['ContentInfo']
    # collection = db["TestCol"]
    # items = collection.find()
    # for item in items:
    #   print(item)

    return "Hello World!"

api.add_resource(HelloWorld, '/')
api.add_resource(ContentInfoAPI, '/contentInfo')

if __name__ == "__main__":
  app.run()