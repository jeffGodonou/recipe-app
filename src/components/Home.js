import React from 'react';
import RecipeList from './RecipeList';
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
      <RecipeList />
    </div>
  );
};

export default Home;