from app import app
from models import db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    # Clear existing data
    User.query.delete()

    # Create test users with hashed passwords
    users = [
        User(
            username='admin',
            email='admin@example.com',
            password_hash=generate_password_hash('admin123')
        ),
        User(
            username='testuser',
            email='user@example.com', 
            password_hash=generate_password_hash('test123')
        ),
        User(
            username='Kevin Kago',
            email='kevin@example.com',
            password_hash=generate_password_hash('kevin123')
        ),
        User(
            username='Eddy Mwaniki',
            email='eddy@example.com',
            password_hash=generate_password_hash('eddy123')
        ),
        User(
            username='Elvis Mungai',
            email='elvis@example.com',
            password_hash=generate_password_hash('elvis123')
        ),
        User(
            username='Steve Baars',
            email='steve@example.com',
            password_hash=generate_password_hash('steve123')
        ),
        User(
            username='Godfrey Makeri',
            email='godfrey@example.com',
            password_hash=generate_password_hash('godfrey123')
        ),
        User(
            username='Abdullahi Abdikhadir',
            email='abdullahi@example.com',
            password_hash=generate_password_hash('abdullahi123')
        )
    ]

    db.session.add_all(users)
    db.session.commit()
    print("Database seeded with test users!")
