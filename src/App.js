import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipeForm from './components/AddRecipeForm';
import './App.scss'

const App = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes)
            setRecipes(JSON.parse(storedRecipes));
    }, []);

    const handleAddRecipe = (newRecipe) => {
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home recipes={recipes} onAddRecipe={ handleAddRecipe }/>} />
                <Route path="/recipe/:id" element={<Recipe/>}/>
                <Route path="/add-recipe" element={<AddRecipeForm onAddRecipe={ handleAddRecipe }/>} />
            </Routes>
        </Router>
    );
};

export default App;
