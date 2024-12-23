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
    return JSON.parse(recipes);
};

// Helper function to write recipes to the file
const writeRecipes = (recipes) => {
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
};

// Endpoint to get all recipes
router.get('/', (req, res) => {
    const recipes = readRecipes();
    res.join(recipes);
});

// Endpoint to add a new recipe
router.post('/', (req, res) => {
    const recipes = readRecipes();
    const newRecipe = req.body;
    try {
        if(!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions) {
            throw new Error('Invalid recipe');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

    recipes.push(newRecipe);
    writeRecipes(recipes);
    res.status(201).send();
});

module.exports = router;