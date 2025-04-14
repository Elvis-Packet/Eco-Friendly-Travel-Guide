#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, User, Destination, Activity, Review, DestinationActivity, TravelTip
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecofriendlydestinations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'  
app.json.compact = False

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

# Create tables
with app.app_context():
    db.create_all()

# Authentication Routes
class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        # Validate required fields
        required = ['username', 'email', 'password', 'confirm_password']
        if not all(field in data for field in required):
            return {'error': 'Missing required fields'}, 400
            
        if data['password'] != data['confirm_password']:
            return {'error': 'Passwords do not match'}, 400
            
        if User.query.filter_by(username=data['username']).first():
            return {'error': 'Username already exists'}, 400
            
        if User.query.filter_by(email=data['email']).first():
            return {'error': 'Email already exists'}, 400
            
        new_user = User(
            username=data['username'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        login_user(new_user)
        return {'message': 'User created successfully'}, 201

class Signin(Resource):
    def post(self):
        data = request.get_json()
        
        user = User.query.filter_by(username=data.get('username')).first()
        
        if not user or not user.check_password(data.get('password')):
            return {'error': 'Invalid username or password'}, 401
            
        login_user(user)
        return {'message': 'Logged in successfully'}, 200

class Logout(Resource):
    @login_required
    def delete(self):
        logout_user()
        return {'message': 'Logged out successfully'}, 200

api.add_resource(Signup, '/signup')
api.add_resource(Signin, '/signin') 
api.add_resource(Logout, '/logout')

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
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(jsonify(reviews), 200)

    def post(self):
        data = request.get_json()

        new_review = Review(
            rating = data['rating'],
            comment = data['comment'],
            user_id = data['user_id'],
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

class Activities(Resource):
    def get(self):
        activities = [a.to_dict() for a in Activity.query.all()]
        return make_response(jsonify(activities), 200)

    def post(self):
        data = request.get_json()

        new_activity = Activity(
            name = data['name'],
            category = data['category'],
            sustainability_level = data['sustainability_level']
        )
        db.session.add(new_activity)
        db.session.commit()
        return make_response(new_activity.to_dict(), 201)

api.add_resource(Activities, '/activities')

class ActivitybyID(Resource):
    def get(self, id):
        activity = Activity.query.get(id)
        if not activity:
            return make_response({'error': 'Activity not found'}, 404)
        return make_response(activity.to_dict(), 200)

    def patch(self, id):
        activity = Activity.query.get(id)
        if not activity:
            return make_response({'error': 'Activity not found'}, 404)

        data = request.get_json()
        for attr in ['name', 'category', 'sustainability_level']:
            if attr in data:
                setattr(activity, attr, data[attr])

        db.session.commit()
        return make_response(activity.to_dict(), 200)

    def delete(self, id):
        activity = Activity.query.get(id)
        if not activity:
            return make_response({'error': 'Activity not found'}, 404)

        db.session.delete(activity)
        db.session.commit()
        return make_response({'message': 'Activity deleted'}, 204)

api.add_resource(ActivitybyID, '/activities/<int:id>')

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
