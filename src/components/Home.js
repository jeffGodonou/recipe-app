import React, { useEffect, useState, useCallback, useRef } from 'react';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from './SearchBar';
import './Home.scss';

const Home = ({ recipes, onAddRecipe }) => {  
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ filteredRecipes, setFilteredRecipes] = useState(recipes); 
  const [ loading, setLoading ] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }; 
  
  const debounceTimer = useRef(null); // used to reduce the number of requests sent and time them
  
  const handleSearch = useCallback(async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        setFilteredRecipes(prevRecipes => [...recipes, ...(data.meals || [])]); // append the list of recipes in combining the new one and the old ones
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
      <div className='header'>
        <h1>
          Welcome to Let's Eat !!!
        </h1>
        <div className='search-bar-container'>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      <p className='description'>
        Find and share inspiration to cook with what you have in your fridge.
      </p>
      
      <div>

      </div>
      {
        loading ? (
          <div> Loading...</div>
        ): (
          <div className='carousel-container'> 
            <RecipeCarousel recipes={filteredRecipes}  onAddRecipe={onAddRecipe} />
          </div>
      )}
    </div>
  );
};

export default Home;