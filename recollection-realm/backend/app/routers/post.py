from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging
from app.database import get_db
from app.models.post import Post as PostModel
from app.models.comment import Comment as CommentModel
from app.schemas.post import PostCreate, PostResponse, CommentCreate, Comment
from app.utils.auth import get_current_user
from app.models.user import User

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/posts",
    tags=["posts"]
)

@router.post("/", response_model=PostResponse)
def create_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Creating post for user: {current_user.name} (ID: {current_user.id})")
    logger.info(f"Post data: {post.dict()}")
    
    try:
        db_post = PostModel(
            **post.dict(),
            user_id=current_user.id
        )
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        
        # Create response with username
        response = PostResponse(
            **db_post.__dict__,
            username=current_user.name
        )
        logger.info(f"Post created successfully: {response}")
        return response
    except Exception as e:
        logger.error(f"Error creating post: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[PostResponse])
def get_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    posts = db.query(PostModel).order_by(PostModel.created_at.desc()).offset(skip).limit(limit).all()
    
    # Create responses with usernames
    responses = []
    for post in posts:
        response = PostResponse(
            **post.__dict__,
            username=post.user.name
        )
        responses.append(response)
    return responses

@router.post("/{post_id}/like", response_model=PostResponse)
def like_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.likes += 1
    db.commit()
    db.refresh(post)
    
    response = PostResponse(
        **post.__dict__,
        username=post.user.name
    )
    return response

@router.post("/{post_id}/comments", response_model=Comment)
def create_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_comment = CommentModel(
        **comment.dict(),
        post_id=post_id,
        user_id=current_user.id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment 