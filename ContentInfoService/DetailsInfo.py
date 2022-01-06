from flask_restful import Resource
from bson.json_util import dumps

import constants

class DetailsInfo(Resource):

    def get(self):
        info = {
            'content_types': constants.CONTENT_TYPES,
            'tags': constants.TAGS
        }
        return info