from bson.objectid import ObjectId
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse
from prometheus_flask_exporter import PrometheusMetrics

from pymongo import MongoClient

app = Flask(__name__)
api = Api(app)
CORS(app)

metrics = PrometheusMetrics.for_app_factory()
metrics.init_app(app)

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
CONNECTION_STRING = "mongodb+srv://user:pass@cluster0.6zaxq.mongodb.net/ratingsDB?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

# Override comments with the database entries
reviews_db = client["ReviewService"]["reviewsDB"]


class Reviews(Resource):
        
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, help='The review id must be provided', required=True)
        args = parser.parse_args()
        
        comment = reviews_db.find_one({'_id': ObjectId(args["id"])})
        return{"review": dumps(comment)}
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='The username must be provided', required=True)
        parser.add_argument('entryID', type=str, help='The entry id must be provided', required=True)
        parser.add_argument('comment', type=str, help='The comment must be provided', required=True)
        parser.add_argument('rating', type=int, help='The rating must be provided', required=True)
        args = parser.parse_args()
        
        comment = {
            "entryID": args["entryID"],
            "username": args["username"],
            "comment": args["comment"],
            "rating": args["rating"]
        }
        
        reviews_db.insert_one(comment)
        return{"status": "ok"}, 201

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, help='The review id must be provided', required=True)
        args = parser.parse_args()

        reviews_db.delete_one({"_id":ObjectId(args["id"])})
        return 201

class ReviewsListForEntry(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('entryID', type=str, help='The entry id must be provided', required=True)
        args = parser.parse_args()
        
        entry_comments = list(reviews_db.find({"entryID":args["entryID"]}))
        
        avg_rating = sum([comment['rating'] for comment in entry_comments ]) / len(entry_comments) 
        
        return {"reviews": dumps(entry_comments), "average_rating": avg_rating}


class ReviewsListForUser(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='The username must be provided', required=True)
        args = parser.parse_args()
        
        user_comments = reviews_db.find({"username":args['username']})
        return {"comments": dumps(user_comments)}


api.add_resource(Reviews, "/review")
api.add_resource(ReviewsListForEntry, "/reviewsEntry")
api.add_resource(ReviewsListForUser, "/reviewsUser")

if __name__ == "__main__":
    app.run()
