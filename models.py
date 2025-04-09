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
    description = db.Column(db.String)
    image_url = db.Column(db.String, nullable=True)

    destination_activities = db.relationship("DestinationActivity", back_populates="destination", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="destination", cascade="all, delete-orphan")
    traveltips = db.relationship("TravelTip", back_populates="destination", cascade="all, delete-orphan")

    serialize_rules = ("-destination_activities.destination", "-reviews.destination", "-traveltips.destination")

    def __repr__(self):
        return f"Destination: {self.name} | Location: {self.location}"

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    sustainability_level = db.Column(db.Integer, nullable=False)

    destination_activities = db.relationship("DestinationActivity", back_populates="activity", cascade="all, delete-orphan")

    serialize_rules = ("-destination_activities.activity")

    def __repr__(self):
        return f'Activity: {self.name} | Type: {self.category} | Sustainability level: {self.sustainability_level}'

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

    def __repr__(self):
        return f"User: {self.user_name} | Rating: {self.rating} | Comment: {self.comment}"

class DestinationActivity(db.Model, SerializerMixin):
    __tablename__ = 'destination_activities'

    id = db.Column(db.Integer, primary_key=True)
    duration_minutes = db.Column(db.Integer)
    destination_id = db.Column(db.Integer, db.ForeignKey("destinations.id"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))

    destination = db.relationship("Destination", back_populates="destination_activities")
    activity = db.relationship("Activity", back_populates="destination_activities")

    serialize_rules = ("-destination.destination_activities", "-activity.destination_activities")

    def __repr__(self):
        return f"<This activity takes about {self.duration_minutes} minutes>"

class TravelTip(db.Model, SerializerMixin):
    __tablename__ = "traveltips"

    id = db.Column(db.Integer, primary_key=True)
    tip = db.Column(db.String)
    destination_id = db.Column(db.Integer, db.ForeignKey("destinations.id"))

    destination = db.relationship("Destination", back_populates="traveltips")

    serialize_rules = ("-destination.traveltips")

    def __repr__(self):
        return f"<{self.tip}>"
