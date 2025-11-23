import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
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

    fetchLocations();
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