#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from models import db, User, Destination, Activity, Review, DestinationActivity

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
            return new_user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 422

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': 'Invalid credentials'}, 401

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

class CheckSession(Resource):
    def get(self):
        user = User.query.get(session.get('user_id'))
        if user:
            return user.to_dict(), 200
        return {}, 401

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login') 
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')

# Import other routes after app creation to avoid circular imports
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
