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

router.get('/analyze', async (req, res) => {
    try {
        const { keyword, startDate, endDate } = req.query;
        const meals = await readMealPlans();

        // Filter meals based on keyword and date range
        // Convert startDate and endDate to Date objects for comparison
        const filteredMeals = meals.filter(meal => {
            const mealDate = new Date(meal.date);
            const matchesKeyword = keyword ? meal.name.toLowerCase().includes(keyword.toLowerCase()) : true;
            const withinDateRange = (!startDate || mealDate >= new Date(startDate)) && 
                                    (!endDate || mealDate <= new Date(endDate));
            return matchesKeyword && withinDateRange;
        })
        console.log('Filtered meals:', filteredMeals); // log the filtered meals


        const aggregatedData = filteredMeals.reduce((acc, meal) => {
            const mealDate = new Date(meal.date).toDateString();
            acc[mealDate] = (acc[mealDate] || 0) + 1; // count meals per date
            return acc;
        }, {});
        console.log('Aggregated meal plan data:', aggregatedData); // log the aggregated data

        const chartData = Object.entries(aggregatedData).map(([date, count]) => ({ x: date, y: count })); // format data for charting
        chartData.sort((a, b) => new Date(a.x) - new Date(b.x)); // sort data by date

        console.log('Meal plan analysis data:', chartData); // log the analysis data
        res.json(chartData); // return the aggregated data for charting
    } catch (error) {
        console.error('Failed to analyze meal plan data:', error.message);
        res.status(500).json({ error: 'Failed to analyze meal plan data' });
    }
});

// Endpoint to add a new meal plan
router.post('/', async (req, res) => {
    try {
        const meals = await readMealPlans();
        const { name, date} = req.body;

        // Parse and format the date properly
        const parsedDate = date ? new Date(date).toISOString() : new Date().toISOString();

        const newMealPlan = {
            id: req.body.id || Date.now().toString(), // generate a unique ID if not provided
            name: name || '',
            date: parsedDate
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

router.put('/:id', async (req, res) => {
    try {
        const meals = await readMealPlans();
        const mealPlanIndex = meals.findIndex(list => list.id === req.params.id);
        if(mealPlanIndex === -1) {
            res.status(404).json({ error: 'Meal plan not found' }); // return 404 Not Found if meal plan not found
            return;
        }

        const { name, date } = req.body;
        const parsedDate = date ? new Date(date).toISOString() : new Date().toISOString();

        const meal = {
            id: req.params.id,
            name: name || '',
            date: parsedDate
        };

        const updatedMealPlan = { ...meals[mealPlanIndex], ...meal };
        meals[mealPlanIndex] = updatedMealPlan;
        await writeMealPlans(meals);

        res.json(updatedMealPlan); // return the updated meal plan
    } catch (error) {
        console.error('Failed to update meal plan:', error.message);
        res.status(500).json({ error: error.message });
    }
}
);

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