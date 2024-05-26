import React, { useEffect, useState } from "react";
import './Recipe.scss'

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        const fecthRecipes = async ()=> {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=16f08fcd71a9490db41c6d5827ad4bce`);
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error('Error met while fetching recipes: ', error);
            } 
        }

        fecthRecipes();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=16f08fcd71a9490db41c6d5827ad4bce`);
            const data = await response.json();
            setSearchTerm(data.recipes);
        } catch (error) {
            console.error('Error met while searching recipes: ', error);
        }
    };
    
    return (
        <div className="recipe-list-container">
            <form className="search-form"  onSubmit={handleSearch}>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Looking for something ?"
                />
                <button type="submit">Search</button>
            </form>
            <h2> Some recipes for you: </h2>
            <ul>
                {recipes.map(recipe => (
                    <li key = {recipe.id}> 
                        {recipe.title} 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;