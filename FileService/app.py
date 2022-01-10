from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

from FileStorage import FileStorage

app = Flask(__name__)
api = Api(app)
CORS(app)

class Test(Resource):
  def get(self):
    return "Pong"
  
api.add_resource(Test, '/test')
api.add_resource(FileStorage, '/fileStorage')

if __name__ == "__main__":
  app.run()