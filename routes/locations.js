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

router.get('/', getLocations);

export default router;