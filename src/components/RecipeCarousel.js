import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import './RecipeCarousel.scss';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    
    return (
        <div
            className = {className}
            style = {{ ...style, display: 'block', background: 'black'}}
            onClick={ onClick }
        />
    );
}

const SamplePrevArrow = (props) => {
    const {className, style, onClick} = props;
    
    return (
        <div
            className = {className}
            style = {{ ...style, display: 'block', background: 'black'}}
            onClick={ onClick }
        />
    );
}

const RecipeCarousel = ({recipes, onDeleteRecipe}) => {
    const navigate = useNavigate();

    const handleAddRecipeClick = () => {
        navigate('/add-recipe');
    };

    if (!Array.isArray(recipes) || recipes.length === 0) 
        return <div> There is no recipe to show </div>;

    const settings = {
        infinite: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
        speed: 500,
        focusOnSelect: true,
        nextArrow: < SampleNextArrow />,
        prevArrow: < SamplePrevArrow />
    };

    return (
        <><Slider {...settings}>
            {recipes.map((recipe) => (
                <div key={recipe.idMeal} className='carousel-card'>
                    <Card key={recipe.idMeal} sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }} className='recipe-card'>
                        <CardMedia
                            component="img"
                            height="300"
                            image={recipe.strMealThumb}
                            alt={recipe.strMeal} />
                        <CardContent className='card-content'>
                            <Typography gutterBottom variant="h5" component="div">
                                {recipe.strMeal}
                            </Typography>
                            {recipe.personal && (
                                <>
                                    <Typography variant='body2' color='textSecondary'>
                                        Personal
                                    </Typography>
                                    <IconButton onClick={() => onDeleteRecipe(recipe.idMeal)} color='error'>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                            <IconButton component={Link} to={`/recipe/${recipe.idMeal}`} color='success'>
                                <AddIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
        <div className='add-recipe-button'>
                <Button
                    variant='contained'
                    color='success'
                    onClick={handleAddRecipeClick}
                >
                    Add Recipe
                </Button>
        </div>
        </>
    );
};

export default RecipeCarousel;