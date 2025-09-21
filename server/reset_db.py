from database import engine
from models import Base

print("Dropping and recreating tables...")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
print("✅ Done resetting database schema.")
