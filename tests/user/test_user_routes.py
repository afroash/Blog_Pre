from fastapi.testclient import TestClient
from app import app
from faker import Faker

fake = Faker()
client = TestClient(app)

def test_signup():
    signup_data = {
        "username": fake.user_name(),
        "email": fake.email(),
        "password": fake.password()
    }
    response = client.post("/user/signup", json=signup_data)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

def get_users_data():
    return {
        "username": fake.user_name(),
        "email": fake.email(),
        "password": "password1"
    }

def test_signup_and_login():
    # Signup
    signup_data = get_users_data()
    response = client.post("/user/signup", json=signup_data)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

    # Login
    login_data = {"username": signup_data["username"], "password": signup_data["password"]}
    response = client.post("/user/login", json=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()['token_type'] == "bearer"
