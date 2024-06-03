import React, { useState } from 'react';
//import RecipeList from './RecipeList';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from './SearchBar';
import './Home.scss';

const Home = () => {  
  const [ searchTerm, setSearchTerm ] = useState('');
  const [, setRecipes] = useState([]); 
  const [, setLoading ] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }; 

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      console.log("Error met while fetching the recipes: ", error);
    } finally {
      setLoading (false);
    }
  };

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
      <RecipeCarousel/>
      
    </div>
  );
};

export default Home;