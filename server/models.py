from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from database import Base

class Trail(Base):
    __tablename__ = "trails"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    park = Column(String) 
    length_miles = Column(Float)
    elevation_gain = Column(Integer)
    difficulty = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    pet_friendly = Column(Boolean, default = False)
    description = Column(Text)
