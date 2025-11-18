import { useState } from 'react'
import './App.css'
import LocationList from './components/locationList'
import Map from './components/Map'

function App() {
  return (
    
      <div>
        <Map />
        <LocationList />
      </div>
       
  )
}

export default App
