import React, { useEffect, useState, useCallback, useRef } from 'react';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from './SearchBar';
import './Home.scss';

const Home = () => {  
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ recipes, setRecipes] = useState([]); 
  const [ loading, setLoading ] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }; 

  const debounceTimer = useRef(null);
  
  const handleSearch = useCallback(async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.log("Error met while fetching the recipes: ", error);
      } finally {
        setLoading (false);
      }
    }, [searchTerm]);

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
  
  return (
    <div>
      <h1>
        Welcome to Let's Eat !!!
      </h1>
      <p className='description'>
        Find and share inspiration to cook with what you have in your fridge.
      </p>
      <div className='search-bar-container'>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </div>
      <div>

      </div>
      {loading ? (
        <div> Loading...</div>
      ): (
        <RecipeCarousel recipes = {recipes} />
      )}
    </div>
  );
};

export default Home;