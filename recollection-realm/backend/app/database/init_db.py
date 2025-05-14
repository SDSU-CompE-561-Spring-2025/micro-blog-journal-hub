from sqlalchemy.orm import Session
from app.models.user import User
from app.models.post import Post
from app.models.comment import Comment
from app.models.journal import Journal
from app.models.entry import Entry
from app.database.connection import Base, engine
from datetime import datetime
from app.utils.utils import get_password_hash

# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)

# Add sample data
def add_sample_data(db: Session):
    # Create sample users with hashed passwords
    sample_users = [
        {
            "name": "Tarun Nair",
            "email": "tarun@example.com",
            "password": get_password_hash("password123")
        },
        {
            "name": "Rhilo Sotto",
            "email": "rhilo@example.com",
            "password": get_password_hash("password123")
        },
        {
            "name": "Johnathon Guerrero",
            "email": "john@example.com",
            "password": get_password_hash("password123")
        },
        {
            "name": "Wilson Cao",
            "email": "wilson@example.com",
            "password": get_password_hash("password123")
        }
    ]

    created_users = {}
    for user_data in sample_users:
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if not existing_user:
            user = User(**user_data, creation_date=datetime.utcnow())
            db.add(user)
            db.commit()
            db.refresh(user)
            created_users[user_data["name"]] = user
        else:
            created_users[user_data["name"]] = existing_user

    # Sample posts data with specific users
    sample_posts = [
        {
            "text": "I explored the vibrant jungles of Costa Rica with breathtaking waterfalls, rare wildlife, and unforgettable hikes. Completing this Bucket List journey felt surreal. Next destination... the tranquil beaches of The Bahamas!",
            "image_url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
            "genre": "Adventure",
            "user_id": created_users["Rhilo Sotto"].id
        },
        {
            "text": "A spontaneous weekend getaway turned into the best trip this year. Discovered hidden coves, tasted local cuisine, and embraced the calm. Thanks to this amazing new travel app!",
            "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            "genre": "Travel",
            "user_id": created_users["Johnathon Guerrero"].id
        },
        {
            "text": "Months of persistence and training paid off—crossing that marathon finish line was a life-changing experience! Nothing beats the energy of the crowd and the pride of reaching your goal.",
            "image_url": "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
            "genre": "Fitness",
            "user_id": created_users["Wilson Cao"].id
        },
        {
            "text": "After countless trials, I finally perfected the soufflé. Fluffy, golden, and light as air—turns out, the secret really is in the egg whites. Cooking is truly an art form!",
            "image_url": "https://images.pexels.com/photos/4252136/pexels-photo-4252136.jpeg",
            "genre": "Cooking",
            "user_id": created_users["Tarun Nair"].id
        }
    ]

    # Add posts if they don't exist
    for post_data in sample_posts:
        existing_post = db.query(Post).filter(
            Post.text == post_data["text"],
            Post.user_id == post_data["user_id"]
        ).first()
        
        if not existing_post:
            post = Post(**post_data)
            db.add(post)
    
    db.commit()

if __name__ == "__main__":
    from app.database import get_db
    
    # Initialize database
    init_db()
    
    # Add sample data
    db = next(get_db())
    add_sample_data(db) 