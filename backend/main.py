from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routers.users import router as users_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(users_router)


@app.get("/")
def home() -> dict[str, str]:
    """..."""
    
    return {
        "message": "FastAPI functioneaza!"
    }