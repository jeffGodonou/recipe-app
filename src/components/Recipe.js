import React, { useEffect, useState } from "react";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fecthRecipes = async ()=> {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=16f08fcd71a9490db41c6d5827ad4bce`);
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error('Error met while fetching recipes', error);
            } 
            
        }

        fecthRecipes();
    }, []);
    
    return (
        <div>
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