from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

import pymongo as mongo
from FileStorage import FileStorage

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(FileStorage, '/fileStorage')

if __name__ == "__main__":
  app.run(port=5001)