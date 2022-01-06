from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from ContentInfo import ContentInfoAPI, ContentsInfoAPI
from DetailsInfo import DetailsInfo

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(ContentInfoAPI, '/contentInfo')
api.add_resource(ContentsInfoAPI, '/contentsInfo')
api.add_resource(DetailsInfo, '/detailsInfo')

if __name__ == "__main__":
  app.run()