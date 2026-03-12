"""Create admin user"""
from database import users_collection
from utils.auth import hash_password
from datetime import datetime

# Check if admin exists
admin = users_collection.find_one({"email": "admin@admin.com"})

if admin:
    print("Admin already exists!")
    print("Email: admin@admin.com")
    print("Password: admin123")
else:
    # Create admin
    admin_data = {
        "name": "Admin",
        "email": "admin@admin.com",
        "password": hash_password("admin123"),
        "phone": "1234567890",
        "role": "admin",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = users_collection.insert_one(admin_data)
    
    print("✓ Admin user created successfully!")
    print("Email: admin@admin.com")
    print("Password: admin123")
    print("\nYou can now login to admin panel at:")
    print("http://localhost:8000/admin.html")
