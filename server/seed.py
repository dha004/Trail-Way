import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Trail

# Load the Excel file
df = pd.read_excel("wa_national_parks_trails.xlsx")

# Start a DB session
db: Session = SessionLocal()

# Clear existing trails
db.query(Trail).delete()
db.commit()

# Insert each trail
for _, row in df.iterrows():
    trail = Trail(
        name=row["name"],
        park=row["park"],
        length_miles=row["length"],
        elevation_gain=row["elevation"],
        difficulty=row["difficulty"],
        latitude=row["latitude"],
        longitude=row["longitude"],
        pet_friendly=row["pet_friendly"],
        description=row["description"]
    )
    db.add(trail)

# Commit and close the session
db.commit()
db.close()
print("✅ Seeded trails into the database.")
