const API_URL = 'http://localhost:5000/api';
let map;
let userLocation = null;
let token = localStorage.getItem('token');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    checkAuth();
    getUserLocation();
});

// Page Navigation
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageName + 'Page').classList.add('active');
}

// Auth Check
function checkAuth() {
    if (token) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    } else {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

// Register
async function register(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        phone: document.getElementById('regPhone').value,
        role: document.getElementById('regRole').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            token = result.token;
            localStorage.setItem('token', token);
            alert('Registration successful!');
            checkAuth();
            showPage('home');
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Login
async function login(e) {
    e.preventDefault();
    
    const data = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            token = result.token;
            localStorage.setItem('token', token);
            alert('Login successful!');
            checkAuth();
            showPage('home');
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Logout
function logout() {
    token = null;
    localStorage.removeItem('token');
    checkAuth();
    showPage('home');
    alert('Logged out');
}

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                map.setView([userLocation.latitude, userLocation.longitude], 15);
                searchNearby();
            },
            (error) => {
                console.error('Location error:', error);
                alert('Please enable location access');
            }
        );
    }
}

// Get Current Location for Add Business
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('bizLat').value = position.coords.latitude;
                document.getElementById('bizLng').value = position.coords.longitude;
            }
        );
    }
}

// Initialize Map
function initMap() {
    map = L.map('map').setView([28.6139, 77.2090], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Search Nearby
async function searchNearby() {
    if (!userLocation) {
        alert('Getting your location...');
        return;
    }
    
    const category = document.getElementById('category').value;
    const radius = document.getElementById('radius').value;
    
    let url = `${API_URL}/search/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius=${radius}`;
    if (category) url += `&category=${category}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
            displayBusinesses(result.data);
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Display Businesses
function displayBusinesses(businesses) {
    // Clear map markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // Add markers
    businesses.forEach(business => {
        const coords = business.location.coordinates;
        L.marker([coords[1], coords[0]])
            .addTo(map)
            .bindPopup(`
                <strong>${business.name}</strong><br>
                ${business.category}<br>
                ${business.distance}m away<br>
                Score: ${business.score}
            `);
    });
    
    // Display list
    const listDiv = document.getElementById('businessList');
    
    if (businesses.length === 0) {
        listDiv.innerHTML = '<p>No businesses found nearby</p>';
        return;
    }
    
    listDiv.innerHTML = `<h3>Found ${businesses.length} businesses</h3>`;
    
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
            <h3>${business.name}</h3>
            <span class="category-badge">${business.category}</span>
            <p>${business.address}</p>
            <p>📍 ${business.distance}m away | ⭐ ${business.rating.toFixed(1)} | 🎯 Score: ${business.score}</p>
            ${business.contact?.phone ? `<p>📞 ${business.contact.phone}</p>` : ''}
        `;
        listDiv.appendChild(card);
    });
}

// Add Business
async function addBusiness(e) {
    e.preventDefault();
    
    if (!token) {
        alert('Please login first');
        showPage('login');
        return;
    }
    
    const data = {
        name: document.getElementById('bizName').value,
        category: document.getElementById('bizCategory').value,
        description: document.getElementById('bizDesc').value,
        address: document.getElementById('bizAddress').value,
        latitude: parseFloat(document.getElementById('bizLat').value),
        longitude: parseFloat(document.getElementById('bizLng').value),
        phone: document.getElementById('bizPhone').value,
        open_time: document.getElementById('bizOpen').value,
        close_time: document.getElementById('bizClose').value
    };
    
    try {
        const response = await fetch(`${API_URL}/business/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Business added successfully!');
            e.target.reset();
            showPage('home');
            searchNearby();
        } else {
            alert('Failed to add business');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}


// ========== ML TRACKING FEATURES ==========

// Track Business View
async function trackBusinessView(businessId, business) {
    try {
        await fetch(`${API_URL}/interactions/track`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                business_id: businessId,
                interaction_type: 'view',
                distance: business.distance || 0,
                category: business.category
            })
        });
    } catch (error) {
        console.log('Tracking error:', error);
    }
}

// Track Business Click
async function trackBusinessClick(businessId, business) {
    try {
        await fetch(`${API_URL}/interactions/track`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                business_id: businessId,
                interaction_type: 'click',
                distance: business.distance || 0,
                category: business.category
            })
        });
    } catch (error) {
        console.log('Tracking error:', error);
    }
}

// Track Search
async function trackSearch(query, category, radius, resultsCount) {
    if (!userLocation) return;
    
    try {
        await fetch(`${API_URL}/interactions/search-history`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: query || 'nearby',
                category: category || 'all',
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                radius: radius,
                results_count: resultsCount
            })
        });
    } catch (error) {
        console.log('Tracking error:', error);
    }
}

// ========== WEBSOCKET REAL-TIME UPDATES ==========

let ws = null;

function connectWebSocket() {
    ws = new WebSocket('ws://localhost:5000/ws');
    
    ws.onopen = () => {
        console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.type === 'new_business') {
            console.log('New business added:', message.data);
            // Auto-refresh search if on home page
            if (document.getElementById('homePage').classList.contains('active')) {
                searchNearby();
            }
        }
        
        if (message.type === 'business_approved') {
            console.log('Business approved:', message.data);
            // Show notification
            showNotification('New business approved nearby!');
            searchNearby();
        }
    };
    
    ws.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...');
        setTimeout(connectWebSocket, 3000);
    };
}

function showNotification(message) {
    // Simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Connect WebSocket on load
connectWebSocket();

// Update displayBusinesses to track views
const originalDisplayBusinesses = displayBusinesses;
displayBusinesses = function(businesses) {
    originalDisplayBusinesses(businesses);
    
    // Track all business views
    businesses.forEach(business => {
        trackBusinessView(business.id, business);
    });
    
    // Track search
    const category = document.getElementById('category').value;
    const radius = document.getElementById('radius').value;
    trackSearch('', category, radius, businesses.length);
};
