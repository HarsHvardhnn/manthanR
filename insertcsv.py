
from pymongo import MongoClient

client = MongoClient("mongodb+srv://manowealth:jJ54ydOeqaKZXa0Y@cluster0.hydf0at.mongodb.net/")
db = client['manowealth']
users_collection = db['users']

users_collection.update_many(
    { "role": { "$in": [None, None] } },
    { "$set": { "role": "user" } }
)