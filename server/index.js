const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/recipes', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/api/recipes', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
    res.status(400).send(error.message);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5001/api/recipes');
    res.send(response.data).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});