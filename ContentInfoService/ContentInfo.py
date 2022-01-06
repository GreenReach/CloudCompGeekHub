from flask import request, abort
from flask_restful import Resource
from marshmallow import Schema, fields
from bson.objectid import ObjectId
from bson.json_util import dumps

import pymongo as mongo

from constants import CONNECTION_STRING

client = mongo.MongoClient(CONNECTION_STRING)
db = client['ContentInfo']
collection = db["ContentInfo"]


class ContentInfoSchemaGET(Schema):
    id = fields.Str(required=True)

class ContentInfoSchemaDELETE(Schema):
    id = fields.Str(required=True)

class ContentInfoSchemaPOST(Schema):
    title = fields.Str(required=True)
    userId = fields.Str(required=True)
    description = fields.Str(required=True)
    contentType = fields.Str(required=True)
    tags = fields.Str(required=True)
    creationDate = fields.DateTime(required=True)    
    

contentInfoSchemaPOST = ContentInfoSchemaPOST()
contentInfoSchemaGET = ContentInfoSchemaGET()
contentInfoSchemaDELETE = ContentInfoSchemaDELETE()
#TODO: checks
class ContentInfoAPI(Resource):
    def get(self):
        errors = contentInfoSchemaGET.validate(request.args)
        if errors:
            abort(400, str(errors))

        item = collection.find_one({'_id': ObjectId(request.args['id'])})
        return {"status": "ok", "item": dumps(item)}

    def post(self):
        errors = contentInfoSchemaPOST.validate(request.form)
        if errors:
            abort(400, str(errors))

        contentInfoJSON = request.form.to_dict()
        collection.insert_one(contentInfoJSON)
        return {"status": "ok"}

    def delete(self):
        errors = contentInfoSchemaDELETE.validate(request.form)
        if errors:
            abort(400, str(errors))

        result = collection.delete_one({'_id': ObjectId(request.form['id'])})
        if result.deleted_count == 1:
            return {"status": "ok"}
        return {"status": "ERROR - no entry deleted"}


class ContentsInfoSchemaGET(Schema):
    searchField = fields.Str(required=True)
    orderKey = fields.Str(required=True)
    numberOfResults = fields.Integer(required=True)

contentsInfoSchemaGET = ContentsInfoSchemaGET()
class ContentsInfoAPI(Resource):

    def get(self):
        errors = contentsInfoSchemaGET.validate(request.args)
        if errors:
            abort(400, str(errors))

        searchField = request.args['searchField']
        numberOfResults = request.args['numberOfResults']
        searchKey = request.args['orderKey']

        if searchField == "creationDate":
            if searchKey == "ASCENDING":
                order = mongo.ASCENDING
            else:
                order = mongo.DESCENDING

            items = collection.find().sort(searchField, order).limit(int(numberOfResults))
        else:
            items = collection.find({searchField: {'$regex': searchKey}})

        return {"status": "ok", "items": dumps(items)}


class ContentInfo(Resource):

    def __init__(self, title, userId, description, contentType, tags, creationDate):
        self.title = title
        self.userId = userId
        self.description = description
        self.contentType = contentType
        self.tags = tags
        self.creationDate = creationDate
