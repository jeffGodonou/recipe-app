import React, { useState } from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
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

const RecipeCarousel = ({recipes, onDeleteRecipe}) => {
    const [open, setOpen] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClickOpen = (id)=> { 
        setSelectedRecipeId(id);
        setOpen(true); 
    };

    const handleClose = () => { setOpen(false) };

    const handleConfirm = () => {
        onDeleteRecipe(selectedRecipeId);
        setOpen(false);
    };
    
    if (!Array.isArray(recipes) || recipes.length === 0) 
        return <div> There is no recipe to show </div>;

    const settings = {
        autoplay: true,
        autoplaySpeed: 100,
        infinite: true,
        centerMode: true,
        slidesToShow: 5,
        speed: 500,
        focusOnSelect: true,
        nextArrow: < SampleNextArrow />,
        prevArrow: < SamplePrevArrow />,
        beforeChange: (current, next) => setCurrentSlide(next)
    };

    const getCardClass = (index) => {
        if (recipes.length === 0) return '';

        let distanceFromCenter;
        const totalSlides = recipes.length;

        if (index <= totalSlides / 2) {
            distanceFromCenter = (index - currentSlide + totalSlides) % totalSlides;
        } else {
            distanceFromCenter = (index - currentSlide - totalSlides) % totalSlides;
        }

        // Normalize distanceFromCenter
        distanceFromCenter = (distanceFromCenter + totalSlides) % totalSlides;
        if (distanceFromCenter > totalSlides / 2) {
            distanceFromCenter -= totalSlides;
        }
        
        if (distanceFromCenter === 0) return 'slick-center';
        if (distanceFromCenter === -1 || distanceFromCenter === 1) return distanceFromCenter < 0 ? 'left-1' : 'right-1';
        if (distanceFromCenter === -2 || distanceFromCenter === 2) return distanceFromCenter < 0 ? 'left-2' : 'right-2';
        return '';
    };

    return (
        <><Slider {...settings}>
            {recipes.map((recipe, index) => { 
                const cardClass = getCardClass(index);
                return (
                <div key={recipe.idMeal} className={`carousel-card ${cardClass}`}>
                    <Card key={recipe.idMeal} sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3, backgroundColor: 'rgb(216, 120, 24)' }} className='recipe-card'>
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
                            <Typography gutterBottom variant="h5" component="div" color="rgb(18, 26, 25)" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight:'bold'}}>
                                {recipe.strMeal}
                            </Typography>
                            <IconButton component={Link} to={`/recipe/${recipe.idMeal}`} color="rgb(18, 26, 25)">
                                <AddIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </div>
            )})}
        </Slider>
        </>
    );
};

export default RecipeCarousel;