import axios from 'axios';

const MAIN_SERVER_URL = 'http://localhost:5000/api'; // URL of the server
const RECIPES_API_URL = `${MAIN_SERVER_URL}/recipes`; // URL of the recipes endpoint
const SHOPPING_LISTS_API_URL = `${MAIN_SERVER_URL}/shopping-lists`; // URL of the shopping lists endpoint
const MEAL_PLAN_API_URL = `${MAIN_SERVER_URL}/mealPlan`; // URL of the meal plan endpoint

// Recipes API functions

// Function to fetch recipes from the server
export const getRecipes = async () => {
    try {
        const response = await axios.get(RECIPES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve recipes', error);
        throw error;
    }
};

// Function to add a recipe to the server
export const addRecipe = async (recipe) => {
    try {
        const response = await axios.post(RECIPES_API_URL, recipe);
        return response.data;
    } catch (error) {
        console.error('Failed to add recipe:', error);
        throw error;
    }
};

// Function to edit a recipe on the server
export const editRecipe = async (recipe) => {
    try {
        const response = await axios.put(`${RECIPES_API_URL}/${recipe.id}`, recipe);
        return response.data;
    } catch (error) {
        console.error('Failed to update recipe:', error);
        throw error;
    }
};

// Funtion to delete a recipe from the server
export const deleteRecipe = async (id) => {
    try {
        const response = await axios.delete(`${RECIPES_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete recipe:', error);
        throw error;
    }
};

// Shopping lists API functions

// Function to fetch shopping lists from the server
export const getShoppingLists = async () => {
    try {
        const response = await axios.get(SHOPPING_LISTS_API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve shopping lists', error);
        throw error;
    }
}

// Function to fetch a shopping list by id from the server
export const getShoppingListById = async (id) => {
    try {
        const response = await axios.get(`${SHOPPING_LISTS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve shopping list', error);
        throw error;
    }
}

// Function to add a shopping list to the server
export const addShoppingList = async (shoppingList) => {
    try {
        const response = await axios.post(SHOPPING_LISTS_API_URL, shoppingList);
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Failed to add shopping list', error);
        throw error;
    }
}

// Function to update a shopping list on the server
export const updateShoppingList = async (shoppingList) => {
    try {
        const response = await axios.put(`${SHOPPING_LISTS_API_URL}/${shoppingList.id}`, shoppingList);
        return response.data;
    } catch (error) {
        console.error('Failed to update shopping list', error);
        throw error;
    }
}

// Function to delete a shopping list from the server
export const deleteShoppingList = async (id) => {
    try {
        const response = await axios.delete(`${SHOPPING_LISTS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete shopping list', error);
        throw error;
    }
}

// Meal plan API functions

// Function to fetch meal plans from the server 
export const getMealPlans = async () => {
    try {
        const response = await axios.get(MEAL_PLAN_API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve meal plans', error);
        throw error;
    }
}

// Function to add a meal plan to the server
export const addMealPlan = async (mealPlan) => {
    try {
        const response = await axios.post(MEAL_PLAN_API_URL, mealPlan);
        return response.data;
    } catch (error) {
        console.error('Failed to add meal plan', error);
        throw error;
    }
}

// Function to update a meal plan on the server
export const updateMealPlan = async (mealPlan) => {
    try {
        const response = await axios.put(`${MEAL_PLAN_API_URL}/${mealPlan.id}`, mealPlan);
        return response.data;
    } catch (error) {
        console.error('Failed to update meal plan', error);
        throw error;
    }
}

// Function to delete a meal plan from the server
export const deleteMealPlan = async (id) => {
    try {
        const response = await axios.delete(`${MEAL_PLAN_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete meal plan', error);
        throw error;
    }
}

// Function to delete multiple meal plans from the server
export const deleteMultipleMealPlans = async (ids) => {
    try {
        const response = await axios.delete(`${MEAL_PLAN_API_URL}`, { data: { ids } });
        return response.data;
    } catch (error) {
        console.error('Failed to delete meal plans', error);
        throw error;
    }
}



