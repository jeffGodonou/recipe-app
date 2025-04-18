const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recipesRouter = require('./routes/recipes');
const shoppingListsRouter = require('./routes/shoppingLists');
const mealPlanRouter = require('./routes/mealPlan');

const app = express();
const PORT = process.env.PORT || 5001;


const corsOptions = {
    origin: ['http://localhost:3000'], // Add allowed origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10gb' }));

// Routes
app.use('/api/recipes', recipesRouter);
app.use('/api/shopping-lists', shoppingListsRouter);
app.use('/api/mealPlan', mealPlanRouter);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Recipe storage service is running on port ${PORT}`);
});
