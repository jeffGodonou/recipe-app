import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipeForm from './components/AddRecipeForm';
import './App.scss'

const App = () => {
    const [recipes, setRecipes] = useState([]);

    const handleAddRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
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
