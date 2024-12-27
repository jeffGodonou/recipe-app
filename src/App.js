import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipeForm from './components/AddRecipeForm';
import ShoppingListPage from './components/ShoppingListPage';
import './App.scss'
import MealPlanPage from './components/MealPlanPage';
import { getRecipes, addRecipe } from './api';
import { set } from 'date-fns';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [shoppingLists, setShoppingLists] = useState([]);

    useEffect(() => { 
        // fetch recipes from API and append the list with the stored recipes
        const fetchRecipes = async () => {
            try {
                // fetch recipes from the API
                const apiRecipes = await fetchRecipefromApi();

                // fetch recipes from the server storage
                const storedRecipes = await getRecipes();

                setRecipes([...storedRecipes, ...apiRecipes]);
            } catch (error) {
                console.error('Failed to fetch recipes', error);
            }
        }

        fetchRecipes();
    }, []);
    
    useEffect(() => {
        // fetch locally stored shopping lists
        const storedShoppingLists = JSON.parse(localStorage.getItem('shoppingLists')) || [];
        setShoppingLists(storedShoppingLists);
    }, []);

    useEffect(() => {
        localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
    }, [shoppingLists]);

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

    const handleAddRecipe = async (newRecipe) => {
        try {
            // add the recipe to the server storage
            const updatedRecipe = await addRecipe(newRecipe);
            setRecipes([...recipes, updatedRecipe]);
        } catch (error) { 
            console.error('Failed to add recipe', error);
            throw error;    
        }
    }   

    const handleDeleteRecipe = (idMeal) => {
        const updatedRecipes = recipes.filter(recipe => recipe.idMeal !== idMeal);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const updateRecipe = (updatedRecipe) => {
        setRecipes(
            prevRecipes => prevRecipes.map( recipe =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
        );
    };

    const handleAddShoppingList = (newList) => {
        const updatedShoppingLists = [...shoppingLists, {...newList, id: Date.now()}];
        setShoppingLists(updatedShoppingLists);
    };

    const handleDeleteShoppingLists = (id) => {
        const updatedShoppingLists = shoppingLists.filter(list => list.id !== id);
        setShoppingLists(updatedShoppingLists);
    };

    return (
        <Router>    
            <Routes>
                <Route exact path="/" element={<Home recipes={recipes} onAddRecipe={handleAddRecipe} onDeleteRecipe={handleDeleteRecipe}/>} />
                <Route path="/recipe/:id" element={<Recipe recipes={recipes} updateRecipe={updateRecipe} onAddShoppingList={handleAddShoppingList}/>}/>
                <Route path="/add-recipe" element={<AddRecipeForm onAddRecipe={handleAddRecipe}/>} />
                <Route path="/shopping-list" element={<ShoppingListPage shoppingLists={shoppingLists} onAddShoppingList={handleAddShoppingList} onDeleteShoppingList={handleDeleteShoppingLists} />} />
                <Route path="/mealplan" element={<MealPlanPage recipes={recipes}/>}/>
            </Routes>
        </Router>
    );
};

export default App;
