from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Local Business Finder API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes import auth, business, search, admin, interactions, websocket

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(business.router, prefix="/api/business", tags=["business"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(interactions.router, prefix="/api/interactions", tags=["interactions"])
app.include_router(websocket.router, tags=["websocket"])

@app.get("/")
def root():
    return {"message": "Local Business Finder API - Python"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
