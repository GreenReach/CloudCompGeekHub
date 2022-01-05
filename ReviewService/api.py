from flask import Flask
from flask_restful import Resource, Api, reqparse, abort, marshal, fields

from pymongo_test_insert import get_database
dbname = get_database()

# Initialize Flask
app = Flask(__name__)
api = Api(app)


# A List of Dicts to store all of the ratings (DEMO ONLY - those two are also in the database)
ratings = [{
    "ratingID": 1,
    "entryID": 1,
    "userID": 1,
    "comment": "Very cool game!",
    "rating": 4
},
    {
    "ratingID": 2,
    "entryID": 3,
    "userID": 3,
    "comment": "Very cool fan art!",
    "rating": 5
}
]


# Override ratings with the database entries
collection_name = dbname["ratingsDB"]
ratings = collection_name.find()
#for item in item_details:
#    print(item)


# Schema For the Rating Request JSON
ratingFields = {
    "ratingID": fields.Integer,
    "entryID": fields.Integer,
    "userID": fields.Integer,
    "comment": fields.String,
    "rating": fields.Integer
}

class Rating(Resource):
    def __init__(self):
        # Initialize The Flsak Request Parser and add arguments as in an expected request
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("entryID", type=int, location="json")
        self.reqparse.add_argument("userID", type=int, location="json")
        self.reqparse.add_argument("comment", type=str, location="json")
        self.reqparse.add_argument("rating", type=int, location="json")

        super(Book, self).__init__()

    # PUT - Given an id
    def put(self, id):
    #add to database
        return 201

    def delete(self, id):
    #remove from databse
        return 201

class RatingsListForEntry(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "ratingID", type=int, required=True, help="The rating id must be provided", location="json")
        self.reqparse.add_argument(
            "userID", type=int, required=True, help="The userID must be provided", location="json")
        self.reqparse.add_argument(
            "comment", type=str, required=False, help="The comment for the rating should be provided", location="json")
        self.reqparse.add_argument(
            "rating", type=int, required=True, help="The rating must be provided", location="json")

    def get(self, entryID):
        return{"ratings": [marshal(rating, ratingFields) for rating in ratings if rating['entryID'] == entryID]}

    def post(self):
        args = self.reqparse.parse_args()
        rating = {
            "ratingID": ratings[-1]['ratingID'] + 1 if len(ratings) > 0 else 1,
            "entryID": args["entryID"],
            "userID": args["userID"],
            "comment": args["comment"],
            "rating": args["rating"]
        }

        ratings.append(rating)
        return{"rating": marshal(rating, ratingFields)}, 201

class RatingsListForUser(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "ratingID", type=int, required=True, help="The rating id must be provided", location="json")
        self.reqparse.add_argument(
            "entryID", type=int, required=True, help="The entryID must be provided", location="json")
        self.reqparse.add_argument(
            "comment", type=str, required=False, help="The comment for the rating should be provided", location="json")
        self.reqparse.add_argument(
            "rating", type=int, required=True, help="The rating must be provided", location="json")

    def get(self, userID):
        return{"ratings": [marshal(rating, ratingFields) for rating in ratings if rating['userID'] == userID]}

    def post(self):
        args = self.reqparse.parse_args()
        rating = {
            "ratingID": ratings[-1]['ratingID'] + 1 if len(ratings) > 0 else 1,
            "entryID": args["entryID"],
            "userID": args["userID"],
            "comment": args["comment"],
            "rating": args["rating"]
        }

        ratings.append(rating)
        return{"rating": marshal(rating, ratingFields)}, 201

api.add_resource(RatingsListForEntry, "/ratingsEntry")
api.add_resource(RatingsListForUser, "/ratingsUser")
api.add_resource(Rating, "/rating/<int:id>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
