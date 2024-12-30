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

        const newRecipe = {
            idMeal: idMeal || Date.now().toString(),
            strMeal: strMeal || '',
            strMealThumb: strMealThumb || '',
            strInstructions: strInstructions || '',
            strIngredients: strIngredients || '',
            personal: personal !== undefined ? personal : true
        };

        recipes.push(newRecipe);
        writeRecipes(recipes);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Failed to create recipe:', error.message);
        res.status(400).json({  // return 400 Bad Request in case of error
            error: error.message,
            received: req.body
        });
    }
});

// Endpoint to delete a recipe
router.delete('/:id', (req, res) => {
    try {
        const recipes = readRecipes();
        const recipeIndex = recipes.findIndex(recipe => recipe.idMeal === req.params.id);
        if(recipeIndex === -1) {
            res.status(404).json({ error: 'Recipe not found' }); // return 404 Not Found if recipe not found
            return;
        }

        recipes.splice(recipeIndex, 1);
        writeRecipes(recipes);
        res.status(204).send(); // return 204 No Content in case of success
    } catch (error) {
        console.error('Failed to delete recipe:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', (req, res) => {
    try {
        const recipes = readRecipes();
        const recipeIndex = recipes.findIndex(recipe => recipe.idMeal === String(req.params.id));
        console.log(recipeIndex.idMeal, req.params.id);
        if(recipeIndex === -1) {
            res.status(404).json({ error: 'Recipe not found' }); // return 404 Not Found if recipe not found
            return;
        }

        // Destructure fields from body
        const { strMeal, strMealThumb, strInstructions, strIngredients } = req.body;

        // Update any provided fields
        if (strMeal !== undefined) recipes[recipeIndex].strMeal = strMeal;
        if (strMealThumb !== undefined) recipes[recipeIndex].strMealThumb = strMealThumb;
        if (strInstructions !== undefined) recipes[recipeIndex].strInstructions = strInstructions;
        if (strIngredients !== undefined) recipes[recipeIndex].strIngredients = strIngredients;
        
        writeRecipes(recipes);
        res.json(recipes[recipeIndex]);
    } catch (error) {
        console.error('Failed to update recipe:', error.message);
        res.status(500).json({ error: error.message });
    }
}); 

module.exports = router;