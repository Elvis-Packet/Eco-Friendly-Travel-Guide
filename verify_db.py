from app import app
from models import db, User

with app.app_context():
    # Create tables if they don't exist
    db.create_all()
    
    # Check if users table exists
    if User.metadata.tables['users'].exists(db.engine):
        print("✅ Database setup correctly - Users table exists")
    else:
        print("❌ Error: Users table not created")

    # Print all tables
    print("\nDatabase tables:")
    print(db.engine.table_names())
