import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipeForm from './components/AddRecipeForm';
import './App.scss'

const App = () => {
    const [recipes, setRecipes] = useState([]);

    // fetch recipes from API and append the list with the stored recipes
    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        fetchRecipefromApi().then(apiRecipes => {
            setRecipes([...storedRecipes, ...apiRecipes]);
        });
    }, []);

    const fetchRecipefromApi = async() => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            const data = await response.json();
            return data.meal || [];
        } catch (error) {
            console.error('Error met while fetching the recipe from API: ', error);
            return [];
        }
    }

    const handleAddRecipe = (newRecipe) => {
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const handleDeleteRecipe = (idMeal) => {
        const updatedRecipes = recipes.filter(recipe => recipe.idMeal !== idMeal);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home recipes={recipes} onAddRecipe={handleAddRecipe} onDeleteRecipe={handleDeleteRecipe}/>} />
                <Route path="/recipe/:id" element={<Recipe recipes={recipes}/>}/>
                <Route path="/add-recipe" element={<AddRecipeForm onAddRecipe={handleAddRecipe}/>} />
            </Routes>
        </Router>
    );
};

export default App;
