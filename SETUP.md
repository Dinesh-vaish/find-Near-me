# Setup Instructions

## Prerequisites
- Node.js (v14+)
- MongoDB (local ya MongoDB Atlas)
- Git

## Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/local-business
JWT_SECRET=your_secret_key_12345
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

Backend will run on http://localhost:5000

## Step 2: Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm start
```

Frontend will run on http://localhost:3000

## Step 3: MongoDB Setup

### Option 1: Local MongoDB
Install MongoDB and run:
```bash
mongod
```

### Option 2: MongoDB Atlas (Free Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update MONGODB_URI in .env

## Testing

1. Register a new user
2. Login
3. Add a business with your current location
4. Search nearby businesses

## Features Working

✅ User registration/login
✅ Add business with location
✅ Search nearby (200-500m)
✅ Smart AI ranking
✅ Category filter
✅ Map view with markers
✅ Distance calculation

## Next Steps

- Mobile app (React Native)
- Admin dashboard
- Image upload
- Reviews system
- Push notifications
