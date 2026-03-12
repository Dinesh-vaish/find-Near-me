# Python Backend Setup

## Step 1: Install Dependencies

```bash
cd backend-python
pip install -r requirements.txt
```

## Step 2: Setup Environment

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/local_business
JWT_SECRET=your_secret_key_12345
PORT=5000
```

## Step 3: Run Server

```bash
python main.py
```

Server will run on http://localhost:5000

## API Documentation

Once running, visit:
- http://localhost:5000/docs (Swagger UI)
- http://localhost:5000/redoc (ReDoc)

## MongoDB Setup

### Option 1: Local MongoDB
Install and run MongoDB locally

### Option 2: MongoDB Atlas (Free)
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Test API

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Search nearby
curl "http://localhost:5000/api/search/nearby?latitude=28.6139&longitude=77.2090&radius=500"
```
