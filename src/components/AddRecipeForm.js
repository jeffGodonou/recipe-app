import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './AddRecipeForm.scss';

const AddRecipeForm = ({ onAddRecipe }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { 
            idMeal: Date.now().toString(), 
            strMeal: name,
            strMealThumb: image,
            strInstructions: instructions,
            strIngredients: ingredients,
            personal: true
                        };
        onAddRecipe(newRecipe);
        navigate('/');
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleImageChange = (event) => {
        setImage(event.target.value);
    }

    const handleIngredientsChange = (event) => {
        setIngredients(event.target.value);
    }

    const handleInstructionsChange = (event) => {
        setInstructions(event.target.value);
    }

    return (
        <Container className="add-recipe-form">
            <Typography variant="h4"> 
                Add a recipe
            </Typography>
            <form onSubmit={ handleSubmit }>
                <TextField
                    label="Recipe name"
                    value={name}
                    onChange={ handleNameChange }
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Image URL"
                    value={image}
                    onChange={ handleImageChange }
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Ingredients"
                    multiline
                    rows={4}
                    value={ingredients}
                    onChange={ handleIngredientsChange }
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Instructions"
                    multiline
                    rows={4}
                    value={instructions}
                    onChange={ handleInstructionsChange }
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default AddRecipeForm;