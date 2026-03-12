import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from '../components/MapView';
import BusinessList from '../components/BusinessList';
import './Home.css';

function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState(500);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          searchNearby(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Please enable location access');
        }
      );
    }
  };

  const searchNearby = async (location = userLocation) => {
    if (!location) return;

    setLoading(true);
    try {
      const params = {
        latitude: location.latitude,
        longitude: location.longitude,
        radius
      };
      
      if (category) params.category = category;

      const response = await axios.get('http://localhost:5000/api/search/nearby', { params });
      setBusinesses(response.data.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <h1>Find Local Businesses Near You</h1>
        
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="coaching">Coaching</option>
            <option value="kirana">Kirana</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="salon">Salon</option>
            <option value="restaurant">Restaurant</option>
            <option value="medical">Medical</option>
          </select>

          <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
            <option value="200">200m</option>
            <option value="500">500m</option>
            <option value="1000">1km</option>
            <option value="2000">2km</option>
          </select>

          <button onClick={() => searchNearby()} className="btn-primary">
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Searching nearby businesses...</div>
      ) : (
        <div className="results-section">
          <MapView businesses={businesses} userLocation={userLocation} />
          <BusinessList businesses={businesses} />
        </div>
      )}
    </div>
  );
}

export default Home;
