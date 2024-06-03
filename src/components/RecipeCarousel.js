import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './RecipeCarousel.scss';

const SampleNextArrow = (props) => {
    const {className, style, onClick} = props;
    
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

const RecipeCarousel = ({recipes}) => {
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
        < Slider {...settings}>        
        {
            recipes.map((recipe) => (
                <div key={recipe.idMeal}  className='carousel-card'>
                <Card key={recipe.idMeal} sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3}} className='recipe-card'>
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
                </div>
            ))}
        </Slider>
        
    );
};

export default RecipeCarousel;