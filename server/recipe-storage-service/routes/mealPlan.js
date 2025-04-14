const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const mealPlanFilePath = path.join(__dirname, '../data/mealPlan.json');

// helper function to read meal plan file
const readMealPlans = async () => {
    try {
        await fs.access(mealPlanFilePath).catch(async () => {
            await fs.writeFile(mealPlanFilePath, '[]'); // create the file if it doesn't exist  
        });

        const meals = await fs.readFile(mealPlanFilePath, 'utf8');
        return JSON.parse(meals);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        throw new Error('Failed to read meal plan data');
    }
};

// helper function to write meal plan file
const writeMealPlans = async (meals) => { 
    try {
        await fs.writeFile(mealPlanFilePath, JSON.stringify(meals, null, 2));
    } catch (error) {
        console.error('Error writing meal plan data:', error);
        throw new Error('Failed to write meal plan data');
    }
};

// Endpoint to get all meal plan
router.get('/', async (req, res) => {
    try {
        const meals = await readMealPlans();
        res.json(meals);
    } catch (error) {  
        console.error('Failed to retrieve the meal plan:', error.message);
        res.status(500).json({ error: 'Failed to retrieve meal plan data' });
    }
});

// Endpoint to add a new meal plan
router.post('/', async (req, res) => {
    try {
        const meals = await readMealPlans();
        const { name, date} = req.body;
        
        /*if (!name || !items) {
            return res.status(400).json({ error: 'Name and items are required' }); // return 400 Bad Request if name or items are missing
        }*/

        const newMealPlan = {
            id: Date.now().toString(),
            name: name || '',
            // items: items || [],
            date: date || new Date().toISOString()
        };

        meals.push(newMealPlan);
        writeMealPlans(meals);

        console.log('Created new meal plan:', newMealPlan);
        res.status(201).json(newMealPlan);
    } catch (error) {
        console.error('Failed to create meal plan:', error.message);
        res.status(500).json({ error: 'Failed to create meal plan' });
    }
});

// Endpoint to delete a meal plan
router.delete('/:id', async (req, res) => {
    try {
        const meals = await readMealPlans();
        const mealPlanIndex = meals.findIndex(list => list.id === req.params.id);
        if(mealPlanIndex === -1) {
            res.status(404).json({ error: 'Meal plan not found' }); // return 404 Not Found if meal plan not found
            return;
        }

        meals.splice(mealPlanIndex, 1);
        await writeMealPlans(meals);

        res.status(204).send(); // No Content in case of success
    } catch (error) {
        console.error('Failed to delete meal plan:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;