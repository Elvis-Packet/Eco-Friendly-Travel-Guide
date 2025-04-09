#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from models import db, User, Destination, Activity, Review, DestinationActivity, TravelTip

def create_app():
    app = Flask(__name__)
    app.secret_key = b'your-secret-key-here'  # Change this in production
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.json.compact = False

    bcrypt = Bcrypt(app)
    migrate = Migrate(app, db)
    db.init_app(app)

    # Create tables
    with app.app_context():
        db.create_all()

    return app

# Create Flask app
app = create_app()
api = Api(app)

# Authentication routes
class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username=data['username'],
                email=data['email']
            )
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 422)

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        return make_response({'error': 'Invalid credentials'}, 401)

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response({}, 204)

class CheckSession(Resource):
    def get(self):
        user = User.query.get(session.get('user_id'))
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({}, 401)

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')

# Destination routes
class Destinations(Resource):
    def get(self):
        destinations_list = [d.to_dict() for d in Destination.query.all()]
        return make_response(jsonify(destinations_list), 200)

    def post(self):
        data = request.get_json()

        new_destination = Destination(
            name=data['name'],
            location=data['location'],
            description=data['description'],
            image_url=data['image_url']
        )
        db.session.add(new_destination)
        db.session.commit()
        return make_response(new_destination.to_dict(), 201)

api.add_resource(Destinations, '/destinations')

# Review routes
class Reviews(Resource):
    def post(self):
        data = request.get_json()

        new_review = Review(
            rating=data['rating'],
            comment=data['comment'],
            user_name=data['user_name'],
            destination_id=data['destination_id'],
            user_id=data.get('user_id')  # Optional from session
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

# Import other routes after app creation to avoid circular imports
from routes import *

if __name__ == '__main__':
    app.run(port=5555, debug=True)
