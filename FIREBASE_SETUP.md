# KScene Spotter - K-Drama Filming Locations

A React + Firestore app to track and map filming locations from K-dramas.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
npm install firebase
```

### 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup
3. Enable **Firestore Database**:
   - In Firebase Console, go to "Build" → "Firestore Database"
   - Click "Create database"
   - Start in **production mode** (we'll adjust rules later)
   - Choose a region close to you

### 3. Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ → Project Settings
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Register app with a nickname (e.g., "kscene-spotter-web")
5. Copy the `firebaseConfig` object

### 4. Configure Environment Variables

Update `.env` file with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 5. Set Firestore Rules (Important!)

In Firebase Console → Firestore Database → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /locations/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Note**: These rules allow anyone to read/write. For production, implement proper authentication.

### 6. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173`

## Features

- ✅ **View Locations**: Table and interactive map (Leaflet.js)
- ✅ **Add Locations**: Form with drama name, location, coordinates, etc.
- ✅ **Delete Locations**: Remove entries from Firestore
- 🗺️ **Map Markers**: Click markers for location details

## Tech Stack

- **Frontend**: React 19 + Vite
- **Database**: Firebase Firestore
- **Maps**: Leaflet.js + OpenStreetMap
- **Styling**: CSS

## Project Structure

```
src/
├── components/
│   ├── AddLocationForm.jsx    # Create locations
│   ├── LocationList.jsx        # Display table with delete
│   ├── Map.jsx                 # Leaflet map with markers
│   └── *.css                   # Component styles
├── firebase.js                 # Firebase config
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
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

## Migration Notes

This project was migrated from PostgreSQL + Express to Firestore. The backend (`server.js`, `routes/`, `config/`) is no longer needed and can be removed.

**Old backend files (safe to delete):**
- `server.js`
- `routes/locations.js`
- `config/database.js`

## License

ISC
