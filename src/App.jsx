import { useState } from 'react'
import './App.css'
import LocationList from './components/locationList'
import Map from './components/Map'
import AddLocationForm from './components/AddLocationForm'

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLocationAdded = () => {
    // Trigger re-fetch in child components by changing key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <Map key={`map-${refreshKey}`} />
      <AddLocationForm onLocationAdded={handleLocationAdded} />
      <LocationList key={`list-${refreshKey}`} />
    </div>
  )
}

export default App
