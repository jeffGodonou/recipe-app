import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import './RecipeCarousel.scss';

const RecipeCarousel = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
                const data = await response.json();
                setRecipes(data.meals);
            } catch (error) {
                console.error("Error met while fetching the recipes: ", error);
            }
        };

        fetchRecipes();
    }, []);

    if (!recipes || recipes.length === 0) 
        return <div> Loading... </div>; // Show a loading state or a message if there are no recipes

    return (
        <div className='carousel-wrapper'>
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
            {
                recipes.map((recipe) => (
                    <div key={recipe.idMeal} className='recipe-card'>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <div className='recipe-info'>
                            <h2> {recipe.strMeal} </h2>
                            <Link to = {`/recipe/${recipe.idMeal}`}>
                                <button className='recipe-button'> + </button>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </Carousel>
        </div>
    );
};

export default RecipeCarousel;