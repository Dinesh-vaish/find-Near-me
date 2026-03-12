import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBusiness({ user }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'kirana',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    phone: '',
    open: '',
    close: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/business', {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        contact: { phone: formData.phone },
        timings: { open: formData.open, close: formData.close }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      alert('Business added successfully!');
      navigate('/');
    } catch (error) {
      alert('Error adding business');
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setFormData({
        ...formData,
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString()
      });
    });
  };

  if (!user) {
    return <div className="page">Please login to add a business</div>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Add New Business</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="coaching">Coaching</option>
              <option value="kirana">Kirana</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="salon">Salon</option>
              <option value="restaurant">Restaurant</option>
              <option value="medical">Medical</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <button type="button" onClick={getCurrentLocation} className="btn-secondary">
              Get Current Location
            </button>
            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                required
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Timings</label>
            <div style={{display: 'flex', gap: '10px'}}>
              <input
                type="time"
                placeholder="Open"
                value={formData.open}
                onChange={(e) => setFormData({...formData, open: e.target.value})}
              />
              <input
                type="time"
                placeholder="Close"
                value={formData.close}
                onChange={(e) => setFormData({...formData, close: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">Add Business</button>
        </form>
      </div>
    </div>
  );
}

export default AddBusiness;
