from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    reviews = db.relationship('Review', backref='author', lazy=True)

    def set_password(self, password):
        self.password_hash = Bcrypt().generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return Bcrypt().check_password_hash(self.password_hash, password)

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    location = db.Column(db.String(100))
    description = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    reviews = db.relationship('Review', back_populates='destination')
    activities = db.relationship('Activity', secondary='destination_activities', back_populates='destinations')
    destination_activities = db.relationship('DestinationActivity', back_populates='destination', overlaps="activities")

    serialize_rules = ('-reviews.destination', '-activities.destinations', '-destination_activities.destination')

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    sustainability_level = db.Column(db.Integer, nullable=False)
    destination_activities = db.relationship('DestinationActivity', back_populates='activity',overlaps="destinations")
    destinations = db.relationship('Destination', secondary='destination_activities', back_populates='activities')

    serialize_rules = ('-destinations.activities', '-destination_activities.activity')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    user_name = db.Column(db.String(100))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    destination = db.relationship('Destination', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews', overlaps="author,reviews")

    serialize_rules = ('-destination.reviews', '-user.reviews')

class DestinationActivity(db.Model, SerializerMixin):
    __tablename__ = 'destination_activities'
    id = db.Column(db.Integer, primary_key=True)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'))
    duration_minutes = db.Column(db.Integer)
    destination = db.relationship('Destination', back_populates='destination_activities', overlaps="activities")
    activity = db.relationship('Activity', back_populates='destination_activities', overlaps="destinations")

    serialize_rules = ('-destination.destination_activities', '-activity.destination_activities')
