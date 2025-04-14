const express = require('express');
const cors = require('cors');

const recipesRouter = require('./routes/recipes');
const shoppingListsRouter = require('./routes/shoppingLists');
const mealPlanRouter = require('./routes/mealPlan');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10gb' }));

app.use('/api/recipes', recipesRouter);
app.use('/api/shopping-lists', shoppingListsRouter);
app.use('/api/mealPlan', mealPlanRouter);

app.listen(PORT, () => {
    console.log(`Recipe storage service is running on port ${PORT}`);
});
