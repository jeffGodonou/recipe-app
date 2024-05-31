import React from 'react';
//import RecipeList from './RecipeList';
import RecipeCarousel from './RecipeCarousel';
import './Home.scss';

const Home = () => {  
  return (
    <div>
      <h1>
        Welcome to Let's Eat !!!
      </h1>
      <p className='description'>
        Find and share inspiration to cook with what you have in your fridge.
      </p>
      <RecipeCarousel/>
      
    </div>
  );
};

export default Home;