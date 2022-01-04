from typing_extensions import Required
from flask import Flask, request, abort
from flask_restful import Resource, Api
from marshmallow import Schema, fields
from typing_extensions import Required
from bson.objectid import ObjectId

import pymongo as mongo
import json 

from constants import CONNECTION_STRING


client = mongo.MongoClient(CONNECTION_STRING)
db = client['ContentInfo']
collection = db["ContentInfo"]


class ContentInfoSchemaGET(Schema):
    id = fields.Str(required=True)

class ContentInfoSchemaPOST(Schema):
    title = fields.Str(required=True)
    userId = fields.Str(required=True)
    description = fields.Str(required=True)
    contentType = fields.Str(required=True)
    tags = fields.Str(required=True)
    #tags = fields.List(fields.String(),required=True)


contentInfoSchemaPOST = ContentInfoSchemaPOST()
contentInfoSchemaGET = ContentInfoSchemaGET()
#TODO: checks, post, delete
class ContentInfoAPI(Resource):
    def get(self):
        errors = contentInfoSchemaGET.validate(request.args)
        if errors:
            abort(400, str(errors))

        item = collection.find_one({'_id': ObjectId(request.args['id'])})
        return str(item)

    def post(self):
        errors = contentInfoSchemaGET.validate(request.form)
        if errors:
            abort(400, str(errors))

        contentInfoJSON = request.form.to_dict()
        print(contentInfoJSON)
        #contentInfo = ContentInfo(title, userId, description, contentType, tags) 
        #contentInfoJSON = json.dumps(contentInfo.__dict__)
        collection.insert_one(contentInfoJSON)
    
    def put(self):
        pass

    def delete(self):
        pass


class ContentsInfoAPI(Resource):

    def get(self):
        #get by any field
        pass

class ContentInfo:
    
    def __init__(self, title, userId, description, contentType, tags):
        self.title = title
        self.userId = userId
        self.description = description
        self.contentType = contentType
        self.tags = tags
        #self.creation_date
       