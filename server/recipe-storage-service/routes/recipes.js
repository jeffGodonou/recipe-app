const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const recipesFilePath = path.join(__dirname, '../data/recipes.json');

// Helper function to read recipes from the file
const readRecipes = () => {
    if(!fs.existsSync(recipesFilePath)) {
        fs.writeFileSync(recipesFilePath, '[]');  // create the file if it doesn't exist
        return [];
    }

    const recipes = fs.readFileSync(recipesFilePath);
    try {
        return JSON.parse(recipes);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        return [];
    }
};

// Helper function to write recipes to the file
const writeRecipes = (recipes) => {
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
};

// Endpoint to get all recipes
router.get('/', (req, res) => {
    const recipes = readRecipes();
    res.json(recipes);
});

// Endpoint to add a new recipe
router.post('/', (req, res) => {
    
    try {
        const recipes = readRecipes();
        const { idMeal, strMeal, strMealThumb, strInstructions, strIngredients, personal } = req.body;

        // Debug logs
        console.log('Parsed fields:', {
            idMeal, strMeal, strMealThumb, strInstructions, strIngredients, personal
        });

        const newRecipe = {
            idMeal: idMeal || Date.now().toString(),
            strMeal: strMeal || '',
            strMealThumb: strMealThumb || '',
            strInstructions: strInstructions || '',
            strIngredients: strIngredients || '',
            personal: personal !== undefined ? personal : true
        };

        console.log('Received recipe', newRecipe);

        recipes.push(newRecipe);
        writeRecipes(recipes);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Failed to create recipe:', error.message);
        res.status(400).json({ 
            error: error.message,
            received: req.body
        });
    }
});

module.exports = router;