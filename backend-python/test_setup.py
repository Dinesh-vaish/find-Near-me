print("Testing Python setup...")

try:
    import fastapi
    print("✓ FastAPI installed")
except:
    print("✗ FastAPI NOT installed - Run: pip install fastapi")

try:
    import uvicorn
    print("✓ Uvicorn installed")
except:
    print("✗ Uvicorn NOT installed - Run: pip install uvicorn")

try:
    import pymongo
    print("✓ PyMongo installed")
except:
    print("✗ PyMongo NOT installed - Run: pip install pymongo")

try:
    from jose import jwt
    print("✓ Python-JOSE installed")
except:
    print("✗ Python-JOSE NOT installed - Run: pip install python-jose[cryptography]")

try:
    from passlib.context import CryptContext
    print("✓ Passlib installed")
except:
    print("✗ Passlib NOT installed - Run: pip install passlib[bcrypt]")

try:
    from dotenv import load_dotenv
    print("✓ Python-dotenv installed")
except:
    print("✗ Python-dotenv NOT installed - Run: pip install python-dotenv")

print("\nIf all ✓, run: python main.py")
