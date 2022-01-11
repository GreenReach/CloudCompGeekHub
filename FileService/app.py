from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics

from FileStorage import FileStorage

app = Flask(__name__)
api = Api(app)
CORS(app)

metrics = PrometheusMetrics.for_app_factory()
metrics.init_app(app)

class Test(Resource):
  def get(self):
    return "Pong"
  
api.add_resource(Test, '/test')
api.add_resource(FileStorage, '/fileStorage')

if __name__ == "__main__":
  app.run()