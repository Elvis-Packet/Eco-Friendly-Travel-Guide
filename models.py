from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

    serialize_rules = ("-password_hash", "-reviews.user")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'User: {self.username} | Email: {self.email}'

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

    serialize_rules = ("-destination_activities.activity",)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'sustainability_level': self.sustainability_level
        }

    def __repr__(self):
        return f'Activity: {self.name} | Type: {self.category} | Sustainability level: {self.sustainability_level}'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    destination_id = db.Column(db.Integer, db.ForeignKey("destinations.id"))

    destination = db.relationship("Destination", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    serialize_rules = ("-destination.reviews", "-user.reviews")

    def __repr__(self):
        return f"Review ID: {self.id} | Rating: {self.rating} | User ID: {self.user_id}"

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

    serialize_rules = ("-destination.traveltips",)

    def to_dict(self):
        return {
            'id': self.id,
            'tip': self.tip,
            'destination_id': self.destination_id
        }

    def __repr__(self):
        return f"<{self.tip}>"
