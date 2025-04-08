from flask import request, jsonify
from app import app
from models import db, Destination, Activity, Review, DestinationActivity
from sqlalchemy.exc import SQLAlchemyError

def error_response(message, code=400):
    return jsonify({'error': message}), code

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Eco-Friendly Travel Guide API'})

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    try:
        destinations = Destination.query.all()
        return jsonify([destination.to_dict() for destination in destinations])
    except SQLAlchemyError as e:
        return error_response(str(e), 500)

@app.route('/api/destinations/<int:id>', methods=['GET'])
def get_destination(id):
    try:
        destination = Destination.query.get(id)
        if not destination:
            return error_response('Destination not found', 404)
        return jsonify(destination.to_dict())
    except SQLAlchemyError as e:
        return error_response(str(e), 500)

# Additional routes would follow the same pattern
# [Other route implementations...]
    try:
        destination = Destination(
            name=data['name'],
            location=data['location'],
            description=data['description'],
            image_url=data.get('image_url')
        )
        db.session.add(destination)
        db.session.commit()
        return jsonify(destination.to_dict()), 201
    except KeyError as e:
        return error_response(f'Missing required field: {str(e)}')
    except SQLAlchemyError:
        return error_response('Database error', 500)

# ACTIVITY ROUTES
@app.route('/api/activities', methods=['GET'])
def get_activities():
    """Get all activities"""
    activities = Activity.query.all()
    return jsonify([activity.to_dict() for activity in activities])

@app.route('/api/activities/<int:id>', methods=['GET'])
def get_activity(id):
    """Get a single activity by ID"""
    activity = Activity.query.get(id)
    if not activity:
        return error_response('Activity not found', 404)
    return jsonify(activity.to_dict())

@app.route('/api/activities', methods=['POST'])
def create_activity():
    """Create a new activity"""
    data = request.get_json()
    try:
        activity = Activity(
            name=data['name'],
            type=data['type'],
            sustainability_level=data['sustainability_level']
        )
        db.session.add(activity)
        db.session.commit()
        return jsonify(activity.to_dict()), 201
    except ValueError as e:
        return error_response(str(e))
    except KeyError as e:
        return error_response(f'Missing required field: {str(e)}')
    except SQLAlchemyError:
        return error_response('Database error', 500)

# REVIEW ROUTES
@app.route('/api/destinations/<int:destination_id>/reviews', methods=['GET'])
def get_destination_reviews(destination_id):
    """Get all reviews for a destination"""
    destination = Destination.query.get(destination_id)
    if not destination:
        return error_response('Destination not found', 404)
    return jsonify([review.to_dict() for review in destination.reviews])

@app.route('/api/reviews', methods=['POST'])
def create_review():
    """Create a new review"""
    data = request.get_json()
    try:
        review = Review(
            rating=data['rating'],
            comment=data.get('comment'),
            user_name=data['user_name'],
            destination_id=data['destination_id']
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201
    except ValueError as e:
        return error_response(str(e))
    except KeyError as e:
        return error_response(f'Missing required field: {str(e)}')
    except SQLAlchemyError:
        return error_response('Database error', 500)

# DESTINATION-ACTIVITY ROUTES
@app.route('/api/destinations/<int:destination_id>/activities', methods=['GET'])
def get_destination_activities(destination_id):
    """Get all activities for a destination"""
    destination = Destination.query.get(destination_id)
    if not destination:
        return error_response('Destination not found', 404)
    return jsonify([activity.to_dict() for activity in destination.activities])

@app.route('/api/destinations/<int:destination_id>/activities/<int:activity_id>', methods=['POST'])
def add_activity_to_destination(destination_id, activity_id):
    """Add an activity to a destination"""
    data = request.get_json()
    try:
        da = DestinationActivity(
            destination_id=destination_id,
            activity_id=activity_id,
            duration_minutes=data.get('duration_minutes')
        )
        db.session.add(da)
        db.session.commit()
        return jsonify(da.to_dict()), 201
    except SQLAlchemyError:
        return error_response('Database error', 500)

@app.route('/api/destinations/<int:destination_id>/activities/<int:activity_id>', methods=['DELETE'])
def remove_activity_from_destination(destination_id, activity_id):
    """Remove an activity from a destination"""
    da = DestinationActivity.query.filter_by(
        destination_id=destination_id,
        activity_id=activity_id
    ).first()
    if not da:
        return error_response('Relationship not found', 404)
    db.session.delete(da)
    db.session.commit()
    return jsonify({'message': 'Activity removed from destination'})
