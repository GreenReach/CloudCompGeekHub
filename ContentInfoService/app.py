import requests

from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

from ContentInfo import ContentInfoAPI, ContentsInfoAPI
from DetailsInfo import DetailsInfo

app = Flask(__name__)
api = Api(app)
CORS(app)


class Test(Resource):
  def get(self):
    return requests.get('http://file-storage-service:5000/test').content + " from file storage"
  
api.add_resource(Test, '/test')
api.add_resource(ContentInfoAPI, '/contentInfo')
api.add_resource(ContentsInfoAPI, '/contentsInfo')
api.add_resource(DetailsInfo, '/detailsInfo')

if __name__ == "__main__":
  app.run()