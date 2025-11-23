import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './LocationList.css';

export default function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'locations'));
      const locationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLocations(locationsData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    
    try {
      await deleteDoc(doc(db, 'locations', id));
      setLocations(prev => prev.filter(loc => loc.id !== id));
      alert('Location deleted successfully!');
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location.');
    }
  };

  return (
    <div className="location-list-container">
      <h1>K-Drama Filming Locations</h1>
      <table className="location-table">
        <thead>
          <tr>
            <th>Drama</th>
            <th>Location</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.drama_name}</td>
              <td>{location.location_name}</td>
              <td>{location.address}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(location.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}