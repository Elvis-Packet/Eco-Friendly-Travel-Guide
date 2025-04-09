#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS 


from models import db, Destination, Activity, Review, DestinationActivity, TravelTip

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecofriendlydestinations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Destinations(Resource):
    def get(self):
        destinations_list = [d.to_dict() for d in Destination.query.all()]
        return make_response(jsonify(destinations_list), 200)

    def post(self):
        data = request.get_json()

        new_destination = Destination(
            name = data['name'],
            location = data['location'],
            description = data['description'],
            image_url = data['image_url']
        )  
        db.session.add(new_destination)
        db.session.commit()
        return make_response(new_destination.to_dict(), 201)  

api.add_resource(Destinations, '/destinations')

class Reviews(Resource):
    def post(self):
        data = request.get_json()

        new_review = Review(
            rating = data['rating'],
            comment = data['comment'],
            user_name = data['user_name'],
            destination_id = data['destination_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

class ReviewsbyID(Resource):
    def patch(self,id):
        data = request.get_json()

        edited_review = Review.query.filter(Review.id == id).first()
        if not edited_review:
            return make_response({'error': "Review not found"}, 404)

        allowed_attr = ['rating', 'comment']
        for attr in allowed_attr:
            if attr in data:
                setattr(edited_review, attr, data[attr])   
        
        db.session.add(edited_review)
        db.session.commit()

        return make_response(edited_review.to_dict(),200)  

    def delete(self,id):
        data = request.get_json()

        delete_review = Review.query.filter(Review.id == id).first()
        if not delete_review:
            return make_response({'error': "Review not found"}, 404)

        db.session.delete(delete_review)
        db.session.commit()

        return make_response({'review delete': "Successful"}, 204)    

api.add_resource(ReviewsbyID, '/reviews/<int:id>')        

class DestinationbyID(Resource):    
    def patch(self,id):
        data = request.get_json()

        edited_destination = Destination.query.filter(Destination.id == id).first()
        if not edited_destination:
            return make_response({'error': "Destination not found"}, 404)

        for attr in data:
            setattr(edited_destination,attr,data[attr])

        db.session.add(edited_destination)
        db.session.commit()

        return make_response(edited_destination.to_dict(),200)

    def delete(self,id):
        data = request.get_json()

        delete_destination = Destination.query.filter(Destination.id == id).first()
        if not delete_destination:
            return make_response({'error': "Destination not found"}, 404)
        
        db.session.delete(delete_destination)
        db.session.commit()

    def get(self,id):
        destination = Destination.query.get(id)

        if not destination:
            return make_response({'error': 'Destination not found'}, 404)

        destination_data = {
            "id": destination.id,
            "name": destination.name,
            "location": destination.location,
            "description": destination.description,
            "image_url": destination.image_url,
            "activities": [
                {
                    "id": destination_activity.activity.id,
                    "name": destination_activity.activity.name,
                    "category": destination_activity.activity.category,
                    "sustainability_level": destination_activity.activity.sustainability_level
                } for destination_activity in destination.destination_activities
            ]
        }

        return make_response(jsonify(destination_data), 200)    

api.add_resource(DestinationbyID, '/destinations/<int:id>')     

if __name__ == '__main__':
    app.run(port=5555, debug=True)



