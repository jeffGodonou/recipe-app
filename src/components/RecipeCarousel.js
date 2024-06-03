import React, { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel'; 
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add' ;
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
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
        
/*        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows
            navButtonsAlwaysVisible
            indicatorContainerProps={{
            style: {
                position: 'relative',
                marginTop: '50px',
                backgroundColor:'white',
            },
            }}
            navButtonsProps={{
            style: {
                backgroundColor: 'transparent',
                color: '#000',
            },
            }}
        > */
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
 //       </Carousel>
        
    );
};

export default RecipeCarousel;