import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipeForm from './components/AddRecipeForm';
import ShoppingListPage from './components/ShoppingListPage';
import './App.scss'
import MealPlanPage from './components/MealPlanPage';
import { getRecipes, addRecipe, deleteRecipe, getShoppingLists, deleteShoppingList, addShoppingList, updateShoppingList } from './api'

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [shoppingLists, setShoppingLists] = useState([]);
    const [recipeAdded, setRecipeAdded] = useState(false);
    const [recipeDeleted, setRecipeDeleted] = useState(false);
    const [errorRequest, setError] = useState(false);

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
        const fetchShoppingLists = async () => {
            try {  
                    const shoppingLists = await getShoppingLists();
                    setShoppingLists(shoppingLists);
                } catch (error) {
                    console.error('Failed to fetch shopping lists :', error);
            }
        }

        fetchShoppingLists();
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
            setRecipeAdded(true);
            setTimeout(() => setRecipeAdded(false), 3000);
        } catch (error) { 
            console.error('Failed to add recipe', error);
            setError(true);
            setTimeout(() => setError(false), 3000);
            throw error;    
        }
    }   

    const handleDeleteRecipe = async (idMeal) => {
        try {
            // delete the recipe from the server storage
            const updatedRecipes = await deleteRecipe(idMeal);
            setRecipes(updatedRecipes);
            setRecipeDeleted(true);
            setTimeout(() => setRecipeDeleted(false), 3000);
        } catch (error) {
            console.error('Failed to delete recipe', error);
            setError(true);
            setTimeout(() => setError(false), 3000);
            throw error;
        }
    };

    const handleAddShoppingList = async (newList) => {
        try {
            const updatedShoppingLists = await addShoppingList(newList); 
            setShoppingLists([...shoppingLists, updatedShoppingLists]);
        } catch (error) {
            console.error('Failed to create shopping list:', error);
        }
    };

    const handleDeleteShoppingLists = async (id) => {
        try {
            await deleteShoppingList(id);

            // update the shopping lists state by removing the deleted list
            setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== id));
        } catch (error) {
            console.error('Failed to delete shopping list:', error);
        }
    };

    const handleDeleteMultipleShoppingLists = async (selectedLists) => {
        try {
            await Promise.all(selectedLists.map((id) => deleteShoppingList(id)));
            setShoppingLists((prevLists) =>
                prevLists.filter((list) => !selectedLists.includes(list.id))
            );
        } catch (error) {
            console.error('Failed to delete selected shopping lists:', error);
        }
    }

    const handleEditShoppingList = async (editedList) => {
        try {
            const updatedShoppingList = await updateShoppingList(editedList);
            console.log('updatedShoppingLists', updatedShoppingList);

            setShoppingLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === updatedShoppingList.id ? updatedShoppingList : list
                )
            );
        } catch (error) {
            console.error('Failed to edit shopping list:', error);
        }       
    };

    return (
        <Router>    
            <Routes>
                <Route exact path="/" element={<Home recipes={recipes} onDeleteRecipe={handleDeleteRecipe} recipeAdded={recipeAdded} recipeDeleted={recipeDeleted} errorRequest={errorRequest}/>} />
                <Route path="/recipe/:id" element={<Recipe recipes={recipes} onAddShoppingList={handleAddShoppingList}/>}/>
                <Route path="/add-recipe" element={<AddRecipeForm onAddRecipe={handleAddRecipe}/>} />
                <Route path="/shopping-list" element={<ShoppingListPage 
                                                        shoppingLists={shoppingLists} 
                                                        onAddShoppingList={handleAddShoppingList} 
                                                        onEditShoppingList={handleEditShoppingList} 
                                                        onDeleteShoppingList={handleDeleteShoppingLists}
                                                        onDeleteMultipleShoppingLists={handleDeleteMultipleShoppingLists}
                                                        />} />
                <Route path="/mealplan" element={<MealPlanPage recipes={recipes}/>}/>
            </Routes>
        </Router>
    );
};

export default App;
