const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10gb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Add a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/api/recipes', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const response = await axios.delete(`http://localhost:5001/api/recipes/${req.params.id}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5001/api/recipes');
    res.send(response.data).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});