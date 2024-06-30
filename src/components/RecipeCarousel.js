import React, { useState } from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import './RecipeCarousel.scss';
import ConfirmDialog from './ConfirmDialog';

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

const RecipeCarousel = ({recipes, handleDeleteRecipe}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = ()=> { setOpen(true) };

    const handleClose = () => { setOpen(false) };

    const handleConfirm = (id) => {
        handleDeleteRecipe(id);
        setOpen(false);
    };
    
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
                        <div className='banier'>
                        {recipe.personal && (
                            <>
                                <Typography variant='body2' color='textSecondary' className='personal-sticker'>
                                        Personal
                                </Typography>
                                < IconButton onClick={() => handleClickOpen(recipe.idMeal)} color='error' className='close-button'>
                                    <CloseIcon />
                                </IconButton>
                                <ConfirmDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm}/>
                            </>
                        )}
                        </div>
                        
                        <CardMedia
                            component="img"
                            height="300"
                            image={recipe.strMealThumb}
                            alt={recipe.strMeal} />
                        <CardContent className='card-content'>
                            <Typography gutterBottom variant="h5" component="div">
                                {recipe.strMeal}
                            </Typography>
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