from flask import request, abort, send_file
from flask_restful import Resource
from marshmallow import Schema, fields
from bson.objectid import ObjectId
from bson.json_util import dumps
from bson.objectid import ObjectId

import pymongo as mongo
import gridfs
import base64

CONNECTION_STRING = "mongodb+srv://admin:1234@filestoragecluster.zf9mz.mongodb.net/test"

client = mongo.MongoClient(CONNECTION_STRING)
db = client['FileStorage']
collection = db["FileStorage"]

class FileStorageSchemaGET(Schema):
    contentId = fields.Str(required=True)

class FileStorageSchemaPOST(Schema):
    contentId = fields.Str(required=True)
    contentFile = fields.Raw(required=True, type='file')

class FileStorageSchemaDELETE(Schema):
    id = fields.Str(required=True)

fileStorageSchemaGET=FileStorageSchemaGET()
fileStorageSchemaPOST = FileStorageSchemaPOST()
fileStorageSchemaDELETE=FileStorageSchemaDELETE()
class FileStorage(Resource):
    def get(self):
        errors = fileStorageSchemaGET.validate(request.args)
        if errors:
            abort(400, str(errors))

        item = collection.find_one({"contentId":request.args['contentId']})
        gridId = item["gridId"]
        
        fs = gridfs.GridFS(db)
        data = fs.find_one(filter=dict(_id=gridId))

        return send_file(data, attachment_filename=item['filename'], as_attachment=True)

    def post(self):
        errors = fileStorageSchemaPOST.validate(request.form | request.files)
        if errors:
            abort(400, str(errors))
        
        fs = gridfs.GridFS(db)
        encoded_data = base64.b64encode(request.files['contentFile'].read())
        grid = fs.new_file(chunkSize=1000000, filename=request.files['contentFile'].filename)
        grid.write(encoded_data) 
        grid.close()

        fileStorageJSON = {"contentId": request.form['contentId'], "gridId":grid._id, "filename":request.files['contentFile'].filename}
        collection.insert_one(fileStorageJSON)

        return {"status":"ok"}


    def delete(self):
        errors = fileStorageSchemaDELETE.validate(request.form)
        if errors:
            abort(400, str(errors))

        item  = collection.find_one_and_delete({"_id": ObjectId(request.form["id"])})
        print(item)
        fs = gridfs.GridFS(db)
        fs.delete(ObjectId(item["gridId"]))

        return {"status": "ok"}

