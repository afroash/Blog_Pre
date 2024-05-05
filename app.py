import uvicorn
from fastapi import FastAPI
from database import  Base, engine
from core.user.routes import user_router
from core.post.routes import post_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router=user_router, prefix="/user")
app.include_router(router=post_router)


Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    uvicorn.run(app=app, host="127.0.0.1", port=8000, reload=True)