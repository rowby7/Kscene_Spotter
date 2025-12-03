# KScene Spotter - K-Drama Filming Locations

https://kscene-spotter.vercel.app/

A React + Firebase (Firestore) application to track and visualize filming locations from K-dramas on an interactive map.

## Features

- 📍 **Interactive Map**: View all K-drama locations on a Leaflet map with clickable markers
- ➕ **Add Locations**: Form to create new location entries with drama name, address, coordinates, scene descriptions
- 📋 **Location List**: Table view of all locations with sorting
- 🗑️ **Delete Locations**: Remove entries from the database
- 🗺️ **Google Maps Integration**: Store links to Google Maps for each location
- ✅ **Visit Tracking**: Mark locations you've visited

## Tech Stack

- **Frontend**: React 19.2 + Vite 7.2
- **Database**: Firebase Firestore (NoSQL cloud database)
- **Maps**: Leaflet.js + OpenStreetMap tiles
- **Styling**: CSS (component-based)

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/rowby7/Kscene_Spotter.git
cd kscene-spotter
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database**:
   - Click "Build" → "Firestore Database" → "Create database"
   - Start in **production mode**
   - Choose your preferred region

4. Set Firestore Rules (IMPORTANT):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   ⚠️ Note: These rules allow public read/write. For production, implement proper authentication.

5. Get Firebase Config:
   - Click gear icon ⚙️ → Project Settings
   - Scroll to "Your apps" → Add web app
   - Copy the `firebaseConfig` values

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then fill in your Firebase credentials in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Usage

### Adding a Location
1. Fill out the "Add New K-Drama Location" form
2. Include drama name, location name, address
3. Add latitude/longitude coordinates (copy from Google Maps: right-click → coordinates)
4. Optionally add scene description and Google Maps link
5. Click "Add Location"

### Viewing Locations
- **Map View**: Interactive map shows all locations with markers
- **Table View**: Scrollable table below the map lists all entries
- Click map markers to see drama name and location details

### Deleting Locations
Click the "Delete" button next to any location in the table.

## Project Structure

```
src/
├── components/
│   ├── AddLocationForm.jsx    # Form component for creating locations
│   ├── AddLocationForm.css     # Form styling
│   ├── LocationList.jsx        # Table component with delete functionality
│   ├── LocationList.css        # Table styling
│   ├── Map.jsx                 # Leaflet map with markers
├── firebase.js                 # Firebase configuration and initialization
├── App.jsx                     # Main app component
├── App.css                     # Global app styles
└── main.jsx                    # Entry point

config/
└── database.js                 # (Legacy - no longer used after Firebase migration)

routes/
└── locations.js                # (Legacy - no longer used after Firebase migration)
```

## Deployment

### Option 1: Firebase Hosting (Recommended)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

## Database Schema

**Collection: `locations`**

| Field | Type | Description |
|-------|------|-------------|
| `drama_name` | string | Name of the K-drama |
| `location_name` | string | Name of the filming location |
| `address` | string | Physical address |
| `scene_description` | string | Description of the scene filmed here |
| `google_maps_link` | string | URL to Google Maps |
| `latitude` | number | GPS latitude coordinate |
| `longitude` | number | GPS longitude coordinate |
| `visited` | boolean | Whether user has visited this location |
| `created_at` | timestamp | When the location was added |

## Requirements Met

✅ **Functional React frontend** using Vite with CRUD operations UI  
✅ **Functional database** (Firestore) connected to the application  
✅ **React components, hooks (useState, useEffect), and props** demonstrated  
✅ **CRUD operations**: Create (add form), Read (list/map), Delete (delete button)  
✅ **Sensitive data hidden** using `.env` and `.gitignore`  
✅ **Multiple commits** on GitHub for all core flows  
✅ **Cloud deployment ready** (Firebase Hosting / Vercel compatible)

## Migration Notes

This project was originally built with PostgreSQL + Express backend but was migrated to Firebase Firestore for simplified deployment and scalability. The old backend files (`server.js`, `routes/`, `config/`) are kept for reference but are no longer used.

## License

ISC

## Author

GitHub: [@rowby7](https://github.com/rowby7)

## Acknowledgments

- OpenStreetMap for map tiles
- Leaflet.js for mapping functionality
- Firebase for backend infrastructure

