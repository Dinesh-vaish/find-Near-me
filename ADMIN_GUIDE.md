# Admin Dashboard Guide

## Access Admin Panel

**URL:** http://localhost:8000/admin.html

**Default Admin Credentials:**
- Email: `admin@admin.com`
- Password: `admin123`

## Features

### 1. Dashboard
- Total businesses count
- Pending approvals count
- Approved businesses count
- Total users
- Total reviews
- Recent activity (last 7 days)

### 2. Pending Approvals
- View all businesses waiting for approval
- Approve businesses (✓ button)
- Reject businesses (✗ button)
- Real-time updates

### 3. All Businesses
- View all businesses (approved, pending, rejected)
- Delete spam/fake businesses
- Filter by status
- See creation dates

### 4. Users Management
- View all registered users
- See user roles (user, business_owner, admin)
- Track registration dates
- View contact information

### 5. Business Heatmap
- Interactive map showing all businesses
- Heatmap overlay for density visualization
- Click markers for business details
- Identify active areas

### 6. Analytics
- Category distribution chart
- Business growth trends
- Popular categories
- Visual insights

## Admin Workflows

### Approve New Business
1. Go to "Pending Approvals"
2. Review business details
3. Click "✓ Approve" to approve
4. Business becomes visible to users

### Remove Spam
1. Go to "All Businesses"
2. Find suspicious business
3. Click "🗑️ Delete"
4. Confirm deletion

### Monitor Activity
1. Check Dashboard for stats
2. View "This Week" count for recent activity
3. Check Heatmap for geographic distribution

### Analyze Trends
1. Go to Analytics
2. View category distribution
3. Identify popular business types
4. Plan marketing strategies

## Security

- Only users with `role: "admin"` can access
- JWT token authentication required
- All actions are logged
- Secure API endpoints

## Create New Admin

Run this command:
```bash
cd backend-python
python create_admin.py
```

Or manually update user role in database to "admin"

## Tips

- Regularly check pending approvals
- Monitor for duplicate businesses
- Review suspicious reviews
- Keep heatmap updated for insights
- Export analytics for reports
