import axios from 'axios';

const API_URL = 'http://localhost:5001/api/recipes';

// Function to fetch recipes from the server
export const getRecipes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve recipes', error);
        throw error;
    }
};

// Function to add a recipe to the server
export const addRecipe = async (recipe) => {
    try {
        const response = await axios.post(API_URL, recipe);
        return response.data;
    } catch (error) {
        console.error('Failed to add recipe', error);
        throw error;
    }
};

// Funtion to delete a recipe from the server
export const deleteRecipe = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete recipe', error);
        throw error;
    }
};