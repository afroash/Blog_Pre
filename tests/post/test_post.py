from core.post.models import Post
from core.user.models import User


def test_create_post():
    post = Post(title='First Post', content='This is my first post thanks')
    assert post.title == 'First Post'
    assert post.content == 'This is my first post thanks'

def test_user_post_relationship():
    user = User(
        username = "user",
        email = "user@example.com",
        hashed_password = "password"
    )
    post = Post(title='First Post', content='This is my first post thanks')
    post.author = user
    assert post.author == user
    
