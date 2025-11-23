import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './AddLocationForm.css';

export default function AddLocationForm({ onLocationAdded }) {
  const [formData, setFormData] = useState({
    drama_name: '',
    location_name: '',
    address: '',
    scene_description: '',
    google_maps_link: '',
    latitude: '',
    longitude: '',
    visited: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const locationData = {
        ...formData,
        latitude: parseFloat(formData.latitude) || null,
        longitude: parseFloat(formData.longitude) || null,
        created_at: Timestamp.now()
      };

      await addDoc(collection(db, 'locations'), locationData);
      
      // Reset form
      setFormData({
        drama_name: '',
        location_name: '',
        address: '',
        scene_description: '',
        google_maps_link: '',
        latitude: '',
        longitude: '',
        visited: false
      });

      if (onLocationAdded) onLocationAdded();
      alert('Location added successfully!');
    } catch (error) {
      console.error('Error adding location:', error);
      alert('Failed to add location. Check console for details.');
    }
  };

  return (
    <div className="add-location-form-container">
      <h2>Add New K-Drama Location</h2>
      <form onSubmit={handleSubmit} className="add-location-form">
        <div className="form-group">
          <label>Drama Name *</label>
          <input
            type="text"
            name="drama_name"
            value={formData.drama_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location Name *</label>
          <input
            type="text"
            name="location_name"
            value={formData.location_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Scene Description</label>
          <textarea
            name="scene_description"
            value={formData.scene_description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Google Maps Link</label>
          <input
            type="url"
            name="google_maps_link"
            value={formData.google_maps_link}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="37.5665"
            />
          </div>

          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="126.9780"
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="visited"
              checked={formData.visited}
              onChange={handleChange}
            />
            I've visited this location
          </label>
        </div>

        <button type="submit" className="submit-btn">Add Location</button>
      </form>
    </div>
  );
}
