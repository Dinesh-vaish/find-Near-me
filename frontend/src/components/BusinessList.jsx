import React from 'react';
import './BusinessList.css';

function BusinessList({ businesses }) {
  if (businesses.length === 0) {
    return (
      <div className="business-list">
        <div className="no-results">
          No businesses found nearby. Try increasing the search radius.
        </div>
      </div>
    );
  }

  return (
    <div className="business-list">
      <h2>Found {businesses.length} businesses</h2>
      
      {businesses.map((business) => (
        <div key={business._id} className="business-card">
          <div className="business-header">
            <h3>{business.name}</h3>
            <span className="category-badge">{business.category}</span>
          </div>
          
          <p className="business-address">{business.address}</p>
          
          <div className="business-stats">
            <span>📍 {business.distance}m away</span>
            <span>⭐ {business.rating.toFixed(1)}</span>
            <span>🎯 Score: {business.score}</span>
          </div>
          
          {business.contact?.phone && (
            <p className="business-contact">📞 {business.contact.phone}</p>
          )}
          
          {business.timings && (
            <p className="business-timings">
              🕐 {business.timings.open} - {business.timings.close}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default BusinessList;
