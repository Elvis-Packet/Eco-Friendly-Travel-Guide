from flask import Flask
from flask_migrate import Migrate
from models import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize db with app
    db.init_app(app)
    migrate = Migrate(app, db)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app

# Create Flask app
app = create_app()

# Import routes after app creation to avoid circular imports
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
