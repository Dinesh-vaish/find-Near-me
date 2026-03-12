import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView({ businesses, userLocation }) {
  const center = userLocation 
    ? [userLocation.latitude, userLocation.longitude]
    : [28.6139, 77.2090]; // Default Delhi

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {businesses.map((business) => (
          <Marker
            key={business._id}
            position={[business.location.coordinates[1], business.location.coordinates[0]]}
          >
            <Popup>
              <strong>{business.name}</strong><br />
              {business.category}<br />
              {business.distance}m away<br />
              Score: {business.score}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
