#!/usr/bin/env python3

from flask_jwt_extended import JWTManager, create_access_token
from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS 
import os


from models import db, Destination, Activity, Review, DestinationActivity, TravelTip, bcrypt, User

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'super_secret_key'
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecofriendlydestinations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
bcrypt.init_app(app)

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

    def get(self):
            reviews_list = [r.to_dict() for r in Review.query.all()]
            return make_response(jsonify(reviews_list), 200)

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

class RegisterUser(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return make_response({'error': "Input all fields"}, 400)

        if User.query.filter((User.username == username) | (User.email == email)).first():
            return make_response({'error':"User already exists"}, 404)

        new_user = User(
            username = username,
            email = email
        )
        new_user.set_password(password)  
        db.session.add(new_user)
        db.session.commit()

        return make_response({'message': "User created"}, 201)

api.add_resource(RegisterUser, '/register')        

class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return make_response({'access_token': access_token}, 200)

        return make_response({'error': "Incorrect username or password"}, 401)

api.add_resource(LoginUser, '/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)



