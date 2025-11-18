import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

const getLocations = (request, response) => {
    pool.query('SELECT * FROM locations ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error;
    }
 response.status(200).json(results.rows);
  });
}

const deleteLocation = (request, response) => {
  const id = parseInt(request.params.id);
  
  pool.query('DELETE FROM locations WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({ message: `Location deleted with ID: ${id}` });
  });
}

const addLocation = (request, response) => {
  pool.query('INSERT INTO locations (drama_name, location_name, address, scene_description, google_maps_link, visited, created_at) VALUES ($1, $2, $3, $4, $5, $6)',[drama_name, location_name, address, scene_description, google_maps_link, visited],(error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json({message: `Location has been added`})
  })
}

router.get('/', getLocations);
router.delete('/:id', deleteLocation);
router.post('/', addLocation);

export default router;