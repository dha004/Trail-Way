from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.orm import Session
import os
import requests

from database import engine, get_db
from models import Base, Trail

# Initialize FastAPI app
app = FastAPI()
load_dotenv()  # Load .env variables
print("Loaded API key:", os.getenv("WEATHER_API_KEY"))

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# API route to fetch all trails from DB
@app.get("/api/trails")
def get_trails(
    park: str = Query(None),
    difficulty: str = Query(None),
    pet_friendly: bool = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Trail)

    if park:
        query = query.filter(Trail.park.ilike(f"%{park}%"))
    if difficulty:
        query = query.filter(Trail.difficulty.ilike(f"%{difficulty}%"))
    if pet_friendly is not None:
        query = query.filter(Trail.pet_friendly == pet_friendly)

    return query.all()
    return [{
        "id": trail.id,
        "name": trail.name,
        "park": trail.park,
        "distance": trail.distance,
        "elevation": trail.elevation,
        "difficulty": trail.difficulty,
        "time": trail.time,
        "pet_friendly": trail.pet_friendly,
        "description": trail.description 
    } for trail in trails]



@app.get("/api/weather")
def get_weather(lat: float = Query(...), lon: float = Query(...)):
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        return {"error": "API key not found"}

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=imperial"
    
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch weather data"}
