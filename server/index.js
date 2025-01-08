const express = require('express');
const axios = require('axios');
const cors = require('cors');

const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');


const app = express();
const PORT = process.env.PORT || 5000;

const STORAGE_SERVICE_URL = 'http://localhost:5001/api';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
      format.timestamp(),
      format.json()
  ),
  transports: [
      new transports.Console(), // log to the console
      // new transports.File({ filename: 'logs.log' }) // 
  ]
});

app.use(express.json({ limit: '10gb' }));
app.use(cors(corsOptions));
app.use(morgan('combined')); // Log all requests to the console with more details using morgan

// Request validation middleware
app.use((req, res, next) => {
  if (req.method === 'POST' && !req.headers['content-type']?.includes('application/json')) {
    return res.status(400).json({ error: 'Content-Type must be application/json' });
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Add a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const response = await axios.post(`${STORAGE_SERVICE_URL}/recipes`, req.body);
    logger.info('Handling POST / request');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${STORAGE_SERVICE_URL}/recipes/${req.params.id}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const response = await axios.get(`${STORAGE_SERVICE_URL}/recipes`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
});

// get a recipe by id
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/recipes/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
});

// get all shopping lists
app.get('/api/shopping-lists', async (req, res) => { 
  try {
    const response = await axios.get(`${STORAGE_SERVICE_URL}/shopping-lists`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json('Failed to retrieve shopping list data:', error );
  }
});


// add a new shopping list
app.post('/api/shopping-lists', async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Add logging
    const response = await axios.post(`${STORAGE_SERVICE_URL}/shopping-lists`, req.body);
    console.log('Storage service response:', response.data); // Add logging
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list' });
  }
});

// delete a shopping list
app.delete('/api/shopping-lists/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${STORAGE_SERVICE_URL}/shopping-lists/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shopping list'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});