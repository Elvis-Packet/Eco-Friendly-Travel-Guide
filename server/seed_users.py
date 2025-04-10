from app import app
from models import db, User

with app.app_context():
    # Clear existing data
    User.query.delete()

    # Create test users
    users = [
        User(username='admin', email='admin@example.com'),
        User(username='traveler1', email='traveler1@example.com'),
        User(username='traveler2', email='traveler2@example.com')
    ]

    # Set passwords
    users[0].set_password('admin123')
    users[1].set_password('travel123')
    users[2].set_password('travel123')

    db.session.add_all(users)
    db.session.commit()

    print("🌱 Database seeded with test users!")
