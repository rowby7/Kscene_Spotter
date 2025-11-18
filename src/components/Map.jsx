import { useEffect, useState } from 'react';

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations
    fetch('http://localhost:5000/api/locations')
      .then(response => response.json())
      .then(data => setLocations(data));
  }, []);

  useEffect(() => {
    if (locations.length === 0) return; // Wait for data

    const map = L.map('map').setView([37.5665, 126.9780], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    
    // Loop through locations and add markers
    locations.forEach(location => {
      if (location.latitude && location.longitude) {
        L.marker([location.latitude, location.longitude])
          .addTo(map)
          .bindPopup(`<b>${location.drama_name}</b><br>${location.location_name}`);
      }
    });
    
    return () => map.remove();
  }, [locations]); // Re-run when locations change

  return <div id="map" style={{ height: '500px' }}></div>;
}