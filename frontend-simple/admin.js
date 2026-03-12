const API_URL = 'http://localhost:5000/api';
let token = localStorage.getItem('token');
let heatmapMap;

// Check if admin
document.addEventListener('DOMContentLoaded', () => {
    if (!token) {
        alert('Please login first');
        window.location.href = 'index.html';
        return;
    }
    
    loadDashboard();
});

// Show Section
function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(section + 'Section').classList.add('active');
    event.target.classList.add('active');
    
    const titles = {
        'dashboard': 'Dashboard',
        'pending': 'Pending Approvals',
        'businesses': 'All Businesses',
        'users': 'Users',
        'heatmap': 'Business Heatmap',
        'analytics': 'Analytics'
    };
    
    document.getElementById('sectionTitle').textContent = titles[section];
    
    // Load data for section
    if (section === 'dashboard') loadDashboard();
    else if (section === 'pending') loadPendingBusinesses();
    else if (section === 'businesses') loadAllBusinesses();
    else if (section === 'users') loadUsers();
    else if (section === 'heatmap') loadHeatmap();
    else if (section === 'analytics') loadAnalytics();
}

// Load Dashboard Stats
async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            const data = result.data;
            document.getElementById('totalBusinesses').textContent = data.total_businesses;
            document.getElementById('pendingBusinesses').textContent = data.pending_businesses;
            document.getElementById('approvedBusinesses').textContent = data.approved_businesses;
            document.getElementById('totalUsers').textContent = data.total_users;
            document.getElementById('totalReviews').textContent = data.total_reviews;
            document.getElementById('recentBusinesses').textContent = data.recent_businesses;
            document.getElementById('pendingCount').textContent = data.pending_businesses;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Pending Businesses
async function loadPendingBusinesses() {
    try {
        const response = await fetch(`${API_URL}/admin/businesses/pending`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayBusinessCards(result.data, 'pendingList', true);
        }
    } catch (error) {
        console.error('Error loading pending businesses:', error);
    }
}

// Load All Businesses
async function loadAllBusinesses() {
    try {
        const response = await fetch(`${API_URL}/admin/businesses`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayBusinessCards(result.data, 'businessList', false);
        }
    } catch (error) {
        console.error('Error loading businesses:', error);
    }
}

// Display Business Cards
function displayBusinessCards(businesses, containerId, showApproval) {
    const container = document.getElementById(containerId);
    
    if (businesses.length === 0) {
        container.innerHTML = '<p>No businesses found</p>';
        return;
    }
    
    container.innerHTML = '';
    
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        
        let statusClass = business.status || 'pending';
        let actions = '';
        
        if (showApproval && business.status === 'pending') {
            actions = `
                <div class="actions">
                    <button class="btn-approve" onclick="approveBusiness('${business.id}')">
                        ✓ Approve
                    </button>
                    <button class="btn-reject" onclick="rejectBusiness('${business.id}')">
                        ✗ Reject
                    </button>
                </div>
            `;
        } else {
            actions = `
                <div class="actions">
                    <button class="btn-delete" onclick="deleteBusiness('${business.id}')">
                        🗑️ Delete
                    </button>
                </div>
            `;
        }
        
        card.innerHTML = `
            <h3>${business.name}</h3>
            <span class="category">${business.category}</span>
            <span class="status ${statusClass}">${statusClass}</span>
            <p>${business.address}</p>
            <p><small>Created: ${new Date(business.created_at).toLocaleDateString()}</small></p>
            ${actions}
        `;
        
        container.appendChild(card);
    });
}

// Approve Business
async function approveBusiness(id) {
    if (!confirm('Approve this business?')) return;
    
    try {
        const response = await fetch(`${API_URL}/admin/businesses/${id}/approve`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Business approved!');
            loadPendingBusinesses();
            loadDashboard();
        }
    } catch (error) {
        alert('Error approving business');
    }
}

// Reject Business
async function rejectBusiness(id) {
    if (!confirm('Reject this business?')) return;
    
    try {
        const response = await fetch(`${API_URL}/admin/businesses/${id}/reject`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Business rejected!');
            loadPendingBusinesses();
            loadDashboard();
        }
    } catch (error) {
        alert('Error rejecting business');
    }
}

// Delete Business
async function deleteBusiness(id) {
    if (!confirm('Delete this business permanently?')) return;
    
    try {
        const response = await fetch(`${API_URL}/admin/businesses/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Business deleted!');
            loadAllBusinesses();
            loadDashboard();
        }
    } catch (error) {
        alert('Error deleting business');
    }
}

// Load Users
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/admin/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayUsersTable(result.data);
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Display Users Table
function displayUsersTable(users) {
    const container = document.getElementById('usersList');
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.phone || '-'}</td>
                <td>${user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Load Heatmap
async function loadHeatmap() {
    try {
        const response = await fetch(`${API_URL}/admin/heatmap`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayHeatmap(result.data);
        }
    } catch (error) {
        console.error('Error loading heatmap:', error);
    }
}

// Display Heatmap
function displayHeatmap(data) {
    if (heatmapMap) {
        heatmapMap.remove();
    }
    
    heatmapMap = L.map('heatmap').setView([28.6139, 77.2090], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(heatmapMap);
    
    // Add markers
    data.forEach(point => {
        L.marker([point.lat, point.lng])
            .addTo(heatmapMap)
            .bindPopup(`<strong>${point.name}</strong><br>${point.category}`);
    });
    
    // Add heatmap layer
    const heatData = data.map(point => [point.lat, point.lng, 1]);
    L.heatLayer(heatData, {radius: 25}).addTo(heatmapMap);
}

// Load Analytics
async function loadAnalytics() {
    try {
        const response = await fetch(`${API_URL}/admin/analytics/categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayCategoryChart(result.data);
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Display Category Chart
function displayCategoryChart(data) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.category),
            datasets: [{
                label: 'Number of Businesses',
                data: data.map(d => d.count),
                backgroundColor: [
                    '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
                    '#9b59b6', '#1abc9c', '#34495e', '#e67e22'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}


// ========== WEBSOCKET REAL-TIME UPDATES ==========

let adminWs = null;

function connectAdminWebSocket() {
    adminWs = new WebSocket(`ws://localhost:5000/ws/admin?token=${token}`);
    
    adminWs.onopen = () => {
        console.log('Admin WebSocket connected');
        showAdminNotification('Real-time updates enabled', 'success');
    };
    
    adminWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.type === 'pending_approval') {
            console.log('New pending business:', message.data);
            showAdminNotification('New business pending approval!', 'warning');
            
            // Auto-refresh if on pending page
            const pendingSection = document.getElementById('pendingSection');
            if (pendingSection.classList.contains('active')) {
                loadPendingBusinesses();
            }
            
            // Update dashboard stats
            loadDashboard();
        }
        
        if (message.type === 'business_approved') {
            console.log('Business approved:', message.data);
            showAdminNotification('Business approved successfully!', 'success');
            loadDashboard();
        }
        
        if (message.type === 'heatmap_update') {
            console.log('Heatmap update triggered');
            
            // Auto-refresh heatmap if visible
            const heatmapSection = document.getElementById('heatmapSection');
            if (heatmapSection.classList.contains('active')) {
                loadHeatmap();
            }
        }
    };
    
    adminWs.onclose = () => {
        console.log('Admin WebSocket disconnected, reconnecting...');
        setTimeout(connectAdminWebSocket, 3000);
    };
    
    adminWs.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

function showAdminNotification(message, type = 'info') {
    const colors = {
        'success': '#27ae60',
        'warning': '#f39c12',
        'error': '#e74c3c',
        'info': '#3498db'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Connect WebSocket when admin panel loads
if (token) {
    connectAdminWebSocket();
}

// Auto-refresh dashboard every 30 seconds
setInterval(() => {
    const dashboardSection = document.getElementById('dashboardSection');
    if (dashboardSection.classList.contains('active')) {
        loadDashboard();
    }
}, 30000);
