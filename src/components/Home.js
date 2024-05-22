import React from 'react';
import RecipeList from './Recipe';

const Home = () => {
  return (
    <div>
      <h1>
        Welcome to Let's Eat !!!
      </h1>
      <p>
        Find and share inspiration to cook with what you have in your frige.
      </p>
      <RecipeList />
    </div>
  );
};

export default Home;