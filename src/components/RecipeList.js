import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './RecipeList.scss'

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm ] = useState('');
    const [loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fecthRecipes = async ()=> {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=16f08fcd71a9490db41c6d5827ad4bce`);
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                setError('Error met while fetching recipes');
                console.error('Error met while fetching recipes: ', error);
            } finally {
                setLoading(false);
            }
        }

        fecthRecipes();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=16f08fcd71a9490db41c6d5827ad4bce`);
            const data = await response.json();
            setSearchTerm(data.recipes);
        } catch (error) {
            setError('Error met while searching recipes');
            console.error('Error met while searching recipes: ', error);
        } finally {
            setLoading(false);
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
            {loading ? (
                <p>Loading...</p>
                ) : error ? (
                    <p> {error} </p>
                ):(
                        <ul>
                            {recipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                                </li>
                            ))}
                        </ul>
            )}
        </div>
    );
};

export default RecipeList;