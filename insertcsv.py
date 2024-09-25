
import pandas as pd
from pymongo import MongoClient
import os
print(os.getcwd())  # This will show you the current working directory

client = MongoClient('mongodb+srv://manowealth:jJ54ydOeqaKZXa0Y@cluster0.hydf0at.mongodb.net/')
db = client['manowealth']
collection = db['users']

def csv_to_mongo(file_path):
    data = pd.read_csv(file_path)
    data_dict = data.to_dict(orient='records')
    
    if data_dict:
        collection.insert_many(data_dict)
        print(f'Successfully inserted {len(data_dict)} records into the collection.')
    else:
        print('No data to insert.')

if __name__ == "__main__":
    file_path = 'RemUsers.csv'
    csv_to_mongo(file_path)