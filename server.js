import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import locationsRouter from './routes/locations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/locations', locationsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'KScene Spotter API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});