import { useState, useEffect } from 'react';
import './LocationList.css';

export default function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="location-list-container">
      <h1>K-Drama Filming Locations</h1>
      <table className="location-table">
        <thead>
          <tr>
            <th>Drama</th>
            <th>Location</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.drama_name}</td>
              <td>{location.location_name}</td>
              <td>{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}