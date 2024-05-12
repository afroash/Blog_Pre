from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from core.user.models import User  
from dependencies import get_db, get_current_user
from .schema import CreateUpdatePost
from .models import Post
from .dependency import get_post_for_user


post_router = APIRouter()

@post_router.post("/posts", response_model=CreateUpdatePost)
def create_post(
    post_data: CreateUpdatePost, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
    ):
    post = Post(
        title=post_data.title, 
        content=post_data.content, 
        author_id=user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

    #{
    #    "data": post_data

    #}///

@post_router.get("/posts")
def list_post(db: Session = Depends(get_db)):
    posts = db.query(Post).options(joinedload(Post.author)).all()
    return {"data": [post.to_dict() for post in posts]}


@post_router.get("/posts/{post_id}")
def veiw_post(post_id:str, db:Session = Depends(get_db), user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return {
        "data": post.__dict__
    }

@post_router.put("/posts/{post_id}")
def edit_post(post_id:str, post_data: CreateUpdatePost, post: Post = Depends(get_post_for_user),
               db: Session = Depends(get_db)):
    post.title = post_data.title
    post.content = post_data.content
    db.commit()
    return {
        "data": post_data
    }


@post_router.delete("/posts/{post_id}")
def delete_post(post: Post = Depends(get_post_for_user), db: Session = Depends(get_db)):
    db.delete(post)
    db.commit()
    return {
        "message": "Post deleted Succesfully"
    }

