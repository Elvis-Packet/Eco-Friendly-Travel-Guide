from app import app
from models import db

with app.app_context():
    inspector = db.inspect(db.engine)
    tables = inspector.get_table_names()
    
    print("Database Verification Results:")
    print(f"Users table exists: {'users' in tables}")
    print("\nAll Database Tables:")
    for table in tables:
        print(f"- {table}")
