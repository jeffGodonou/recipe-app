import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './AddRecipeForm.scss';

const AddRecipeForm = ({ onAddRecipe }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // create a file localy to store the image uploaded
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
        <>
            <Navbar/>
            <Container className="add-recipe-form">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Recipe name"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                        margin="normal"
                        color="success" />
                    <TextField
                        label="Image URL"
                        value={image}
                        onChange={handleImageChange}
                        fullWidth
                        margin="normal"
                        color="success" />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                        style={{ display: 'block', margin: '20px 0' }} />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '100%', height: 'auto' }} />
                    )}
                    <TextField
                        label="Ingredients"
                        multiline
                        rows={4}
                        value={ingredients}
                        onChange={handleIngredientsChange}
                        fullWidth
                        margin="normal"
                        color="success" />
                    <TextField
                        label="Instructions"
                        multiline
                        rows={4}
                        value={instructions}
                        onChange={handleInstructionsChange}
                        fullWidth
                        margin="normal"
                        color="success" />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Submit
                    </Button>
                </form>
            </Container></>
    );
};

export default AddRecipeForm;