from typing_extensions import Required
from flask import Flask, request, abort
from flask_restful import Resource, Api
from marshmallow import Schema, fields
from typing_extensions import Required
from bson.objectid import ObjectId
from bson.json_util import dumps

import pymongo as mongo
import json 

import constants

class DetailsInfo(Resource):

    def get(self):
        info = {
            'content_types': constants.CONTENT_TYPES,
            'tags': constants.TAGS
        }
        return info