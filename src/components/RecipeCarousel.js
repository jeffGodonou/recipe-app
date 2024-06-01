import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add' ;
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
        
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
        {
            recipes.map((recipe) => (
                <Card key={recipe.idMeal} sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3}}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={recipe.strMealThumb}
                        alt={recipe.strMeal}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {recipe.strMeal}
                        </Typography>
                        <IconButton component={Link} to={`/recipe/${recipe.idMeal}`} color="primary">
                            <AddIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
        </Carousel>
        
    );
};

export default RecipeCarousel;