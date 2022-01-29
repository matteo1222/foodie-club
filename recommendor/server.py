from flask import Flask
from flask_restful import Resource, Api, reqparse
from gensim.models.doc2vec import Doc2Vec
from nltk.tokenize import word_tokenize
import pandas as pd
import ast

# Load model
model = Doc2Vec.load('d2v.model')
restaurants = pd.read_csv('restaurants_with_doc.csv', index_col=0)
restaurants_with_score = pd.read_csv('restaurants_with_score.csv')

app = Flask(__name__)
api = Api(app)

class Recommendations(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mode', type=str)
        parser.add_argument('id', type=int)

        if parser.parse_args().mode == 'similar' and parser.parse_args().id != None:
            id = parser.parse_args().id

            if id > restaurants.shape[0]:
                return None, 404

            test_data = word_tokenize(restaurants.loc[id]['doc'].lower())
            v1 = model.infer_vector(test_data)
            similar_doc = model.dv.most_similar([v1], topn=7)
            return similar_doc[1:], 200

        elif parser.parse_args().mode == 'popular':
            top_indices = restaurants_with_score.head(6)['id']
            return list(top_indices), 200
        else:
            return None, 404
    pass

api.add_resource(Recommendations, '/recommendations')

if __name__ == '__main__':
    app.run()