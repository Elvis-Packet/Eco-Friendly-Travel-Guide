# Eco-Friendly Travel Guide

A web application that helps users discover and share sustainable travel destinations and activities.

## Features

- User authentication (signup/login/logout)
- Browse eco-friendly destinations
- View destination details and activities
- Submit and manage reviews
- Track sustainable activities
- Get travel tips for each destination

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Elvis-Packet/Eco-Friendly-Travel-Guide.git
cd Eco-Friendly-Travel-Guide
```

2. Install dependencies:
```bash
pipenv install
pipenv shell
```

3. Set up the database:
```bash
python seed.py
```

4. Run the application:
```bash
python app.py
```

## API Endpoints

### Authentication
- POST `/signup` - Create new account
- POST `/login` - Authenticate user
- DELETE `/logout` - End session
- GET `/check_session` - Verify active session

### Destinations
- GET `/destinations` - List all destinations
- POST `/destinations` - Create new destination
- GET `/destinations/<int:id>` - Get destination details
- PATCH `/destinations/<int:id>` - Update destination
- DELETE `/destinations/<int:id>` - Remove destination

### Reviews
- POST `/reviews` - Create new review
- PATCH `/reviews/<int:id>` - Update review
- DELETE `/reviews/<int:id>` - Remove review

## Database Schema

### Models
- **User**: id, username, email, password_hash
- **Destination**: id, name, location, description, image_url
- **Activity**: id, name, category, sustainability_level
- **Review**: id, rating, comment, user_id, destination_id
- **DestinationActivity**: id, duration_minutes, destination_id, activity_id
- **TravelTip**: id, tip, destination_id

## Technologies Used

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-RESTful
- Flask-Login
- Flask-Bcrypt
- SQLite (development)

