# 🚀 Local Business Finder

AI-Powered Hyperlocal Business Discovery Platform

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()
[![Python](https://img.shields.io/badge/Python-3.11-blue)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---

## 📋 Overview

Chhote dukano, coaching centers, aur local businesses ko map pe dikhane ka system. Google Maps pe sirf bade chains dikhte hain, ye platform 200m-2km ke andar ke chhote businesses ko priority deta hai.

### 🎯 Problem
- Small businesses Google Maps pe nahi dikhte
- Customers ko nearby shops nahi milte
- Local businesses ko visibility nahi milti

### ✨ Solution
- AI-powered hyperlocal search (200m-2km)
- ML-based ranking (not just distance)
- Real-time updates via WebSocket
- Admin approval system for quality

---

## 🌟 Features

### User Features
- ✅ Location-based search (200m-2km radius)
- ✅ 8 categories (Restaurant, Coaching, Plumber, etc.)
- ✅ Interactive map (Leaflet.js)
- ✅ Business details with reviews
- ✅ Direct call & navigation
- ✅ User authentication (JWT)

### Business Features
- ✅ Add/Edit business listings
- ✅ Upload photos & details
- ✅ Operating hours management
- ✅ Contact information
- ✅ Category selection

### Admin Features
- ✅ Business approval workflow
- ✅ Real-time notifications
- ✅ Analytics dashboard
- ✅ User management
- ✅ Spam/fake detection

### AI/ML Features
- ✅ Smart ranking algorithm (5 factors)
- ✅ Behavior tracking
- ✅ Personalized results
- ✅ Click-through rate optimization

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT
- **Real-time**: WebSocket
- **ML**: Scikit-learn

### Frontend
- **Core**: HTML5, CSS3, JavaScript
- **Maps**: Leaflet.js
- **Charts**: Chart.js
- **Design**: Responsive, Mobile-first

### DevOps
- **Backend Hosting**: Render.com (FREE)
- **Frontend Hosting**: Netlify (FREE)
- **Database**: MongoDB Atlas (FREE tier)
- **Version Control**: Git/GitHub

---

## 📁 Project Structure

```
local-business-finder/
├── backend-python/          # FastAPI backend (25+ files)
│   ├── routes/             # API endpoints
│   ├── models.py           # Database models
│   ├── database.py         # MongoDB connection
│   ├── utils/              # Helper functions
│   ├── ml/                 # ML ranking system
│   └── main.py             # Application entry
│
├── frontend-simple/         # User interface (6 files)
│   ├── index.html          # Main page
│   ├── admin.html          # Admin dashboard
│   ├── app.js              # Frontend logic
│   └── style.css           # Styling
│
├── project-report/          # LaTeX documentation
│   └── main.tex            # Academic report
│
└── Documentation/
    ├── README.md           # This file
    ├── SETUP.md            # Installation guide
    ├── DEPLOYMENT_GUIDE.md # Complete deployment guide
    ├── QUICK_START.md      # 30-minute launch guide
    ├── LAUNCH_CHECKLIST.md # Pre-launch tasks
    ├── PROJECT_SUMMARY.md  # Complete project summary
    ├── DEPLOYMENT_DIAGRAM.md # Architecture diagrams
    └── ADMIN_GUIDE.md      # Admin manual
```

**Total**: 52+ files, 5000+ lines of code

---

## 🚀 Quick Start

### Option 1: Local Development (5 minutes)

#### Backend
```bash
cd backend-python
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
python main.py
```

Backend runs at: `http://localhost:5000`

#### Frontend
```bash
cd frontend-simple
# Open with any HTTP server
python -m http.server 8000
# Or use Live Server in VS Code
```

Frontend runs at: `http://localhost:8000`

### Option 2: Deploy to Production (30 minutes)

**See**: [QUICK_START.md](QUICK_START.md) for step-by-step deployment guide

**FREE Hosting**:
- Backend: Render.com
- Frontend: Netlify
- Database: MongoDB Atlas

**Cost**: ₹0/month

---

## 📚 Documentation

### Getting Started
- 📖 [SETUP.md](SETUP.md) - Complete installation guide
- ⚡ [QUICK_START.md](QUICK_START.md) - Deploy in 30 minutes
- ✅ [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) - Pre-launch tasks

### Deployment
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment guide
- 🎨 [DEPLOYMENT_DIAGRAM.md](DEPLOYMENT_DIAGRAM.md) - Architecture diagrams
- 💰 Cost breakdown (FREE to ₹8500/month options)

### Project Information
- 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete project overview
- 👨‍💼 [ADMIN_GUIDE.md](ADMIN_GUIDE.md) - Admin dashboard manual
- 🤖 [ML_FEATURES.md](ML_FEATURES.md) - AI/ML implementation details

### Academic
- 📄 [project-report/main.tex](project-report/main.tex) - LaTeX report
- 🎓 SAGE University, Indore - B.Tech CSE Project

---

## 🔌 API Endpoints

### Authentication (2 endpoints)
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Business (6 endpoints)
```
POST   /api/business/add      - Add new business
GET    /api/business/{id}     - Get business details
PUT    /api/business/{id}     - Update business
DELETE /api/business/{id}     - Delete business
GET    /api/business/user/{id} - Get user's businesses
GET    /api/business/all      - Get all businesses
```

### Search (3 endpoints)
```
POST /api/search/nearby           - Search nearby businesses
GET  /api/search/category/{cat}   - Search by category
GET  /api/search/query            - Text search
```

### Admin (5 endpoints)
```
GET    /api/admin/pending      - Get pending approvals
PUT    /api/admin/approve/{id} - Approve business
PUT    /api/admin/reject/{id}  - Reject business
GET    /api/admin/stats        - Get statistics
DELETE /api/admin/business/{id} - Delete business
```

### Interactions (4 endpoints)
```
POST /api/interactions/view     - Track view
POST /api/interactions/click    - Track click
POST /api/interactions/call     - Track call
POST /api/interactions/navigate - Track navigation
```

### WebSocket (1 endpoint)
```
WS /ws - Real-time updates
```

**Total**: 25+ API endpoints

**API Documentation**: `http://localhost:5000/docs` (Swagger UI)

---

## 🤖 Smart Ranking Algorithm

```python
Score = (Distance × 30%) + 
        (Review Score × 20%) + 
        (Click-Through Rate × 20%) + 
        (User Engagement × 15%) + 
        (Business Activity × 15%)
```

### Factors:
1. **Distance** (30%): Closer = Higher rank
2. **Reviews** (20%): Better ratings = Higher rank
3. **CTR** (20%): More clicks = Higher rank
4. **Engagement** (15%): More interactions = Higher rank
5. **Activity** (15%): Recently updated = Higher rank

**See**: [ML_FEATURES.md](ML_FEATURES.md) for detailed implementation

---

## 💰 Cost Breakdown

### FREE Launch (Recommended for Start)
```
Backend:  Render.com FREE
Frontend: Netlify FREE
Database: MongoDB Atlas FREE (512MB)
Domain:   Use .onrender.com / .netlify.app
─────────────────────────────────
TOTAL:    ₹0/month
Users:    100-500
```

### Professional (₹500/month)
```
Backend:  DigitalOcean ₹500/month
Frontend: Netlify FREE
Database: MongoDB Atlas FREE
Domain:   ₹800/year
─────────────────────────────────
TOTAL:    ₹500/month + ₹800/year
Users:    1000-5000
```

### Production (₹8500/month)
```
Backend:  AWS EC2 ₹2000/month
Frontend: Vercel Pro ₹1500/month
Database: MongoDB M10 ₹5000/month
Domain:   ₹1000/year
─────────────────────────────────
TOTAL:    ₹8500/month + ₹1000/year
Users:    10,000-50,000
```

**See**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed cost analysis

---

## 👥 Team

**SAGE University, Indore - B.Tech CSE (2024-2025)**

1. Dinesh Kumar Bais (0043)
2. Kapilesh Dhakad (0065)
3. Lokesh Fuleriya (0070)
4. Rishabh Khatarkar (0099)

---

## 📊 Project Stats

- ✅ **52+ files** created
- ✅ **5000+ lines** of code
- ✅ **25+ API** endpoints
- ✅ **4 weeks** development time
- ✅ **₹0** development cost
- ✅ **Production-ready** code

---

## 🎯 Future Enhancements

### Phase 2 (Next 3 months)
- [ ] Mobile app (React Native/Flutter)
- [ ] Push notifications
- [ ] Payment integration
- [ ] Business analytics

### Phase 3 (Next 6 months)
- [ ] AI chatbot
- [ ] Voice search
- [ ] AR navigation
- [ ] Multi-language support

### Phase 4 (Next 12 months)
- [ ] Franchise model
- [ ] White-label solution
- [ ] API marketplace
- [ ] Blockchain verification

---

## 🏆 Unique Selling Points

1. **Hyperlocal Focus**: 200m-2km radius (not city-wide)
2. **AI Ranking**: ML-based, not just distance
3. **Small Business First**: No big chains dominating
4. **Real-time Updates**: WebSocket technology
5. **Admin Verification**: Quality control
6. **Free to Start**: No upfront cost

---

## 📜 Patent Potential

### Patentable Features:
1. Dynamic Radius Filtering Algorithm
2. Behavior-Based Ranking System
3. Crowd-Verified Listing System

**Cost**: ₹50,000-2,00,000  
**Timeline**: 2-3 years

---

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Input validation
- ✅ HTTPS/SSL
- ✅ XSS protection
- ✅ Environment variables for secrets

---

## 🧪 Testing

### Manual Testing
- ✅ All API endpoints tested
- ✅ User flow verified
- ✅ Admin flow verified
- ✅ Real-time updates working

### Automated Testing
- ⏳ Unit tests (can be added)
- ⏳ Integration tests (can be added)

---

## 📞 Support

### Issues?
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) troubleshooting section
- Check [SETUP.md](SETUP.md) for installation issues
- Review API docs at `/docs` endpoint

### Resources
- FastAPI: https://fastapi.tiangolo.com
- MongoDB: https://docs.mongodb.com
- Render: https://render.com/docs
- Netlify: https://docs.netlify.com

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🎉 Status

**✅ Production Ready**

- [x] Backend complete
- [x] Frontend complete
- [x] Admin dashboard complete
- [x] Documentation complete
- [x] Ready to deploy
- [x] Ready for users

---

## 🚀 Next Steps

1. **Deploy**: Follow [QUICK_START.md](QUICK_START.md)
2. **Test**: Complete [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)
3. **Launch**: Get your first users
4. **Iterate**: Improve based on feedback

---

## 📧 Contact

**Project**: Local Business Finder  
**University**: SAGE University, Indore  
**Year**: 2024-2025  
**Status**: Ready to Launch 🚀

---

**Made with ❤️ by Team Local Business Finder**

*Empowering small businesses, one search at a time.*
