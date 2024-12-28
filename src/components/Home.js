import React, { useEffect, useState, useCallback, useRef } from 'react';
import RecipeCarousel from './RecipeCarousel';
import Navbar from './Navbar';
import Loader from './Loader';
import './Home.scss';
import { Alert } from '@mui/material';

const Home = ({ recipes, onDeleteRecipe, recipeAdded, recipeDeleted }) => {  
  const [ filteredRecipes, setFilteredRecipes] = useState(recipes); 
  const [ loading, setLoading ] = useState(true);
  const [ searchTerm, setSearchTerm ] = useState('');
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }; 
  
  const debounceTimer = useRef(null); // used to reduce the number of requests sent and time them
  
  const handleSearch = useCallback(async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        setFilteredRecipes([...recipes, ...(data.meals || [])]); // append the list of recipes in combining the new one and the old ones
      } catch (error) {
        console.log("Error met while fetching the recipes: ", error);
      } finally {
        setLoading (false);
      }
    }, [searchTerm, recipes]);

  useEffect(() => { 
    if(debounceTimer.current)
      clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);
  
  return (
    <div className='home-container'>
      <Navbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleSearch={handleSearch} handleAddRecipeClick={handleSearch}/>
      <p className='description'>
          Let's unleash your culinary creativity. <br/>
          Weather you are looking to make the most of what's in your fridge or 
        try to whisk something new and exciting, you can explore the wide range 
        of dishes, get inspired by different cuisines, and turn everyday ingredients 
        into delightful meal. <br/>
          Here you can organize, try, create and discover fun recipes with ease.  
      </p>
      
      {
        loading ? (
          <div>
            <div> Loading...</div>
            <Loader color='green'/>
          </div>
        ): (
          <div className='carousel-container'> 
            <RecipeCarousel recipes={filteredRecipes} onDeleteRecipe={onDeleteRecipe}/>
          </div>
      )}

      {
        recipeAdded && ( 
          <div className='alert'>
            <Alert variant="outlined" severity="success"> 
              Your recipe have been added successfully!
            </Alert>
          </div>
      )}

      {
        recipeDeleted && ( 
          <div className='alert'>
            <Alert variant="outlined" severity="success"> 
              Your recipe have been deleted successfully!
            </Alert>
          </div>
      )}
      
    </div>
  );
};

export default Home;