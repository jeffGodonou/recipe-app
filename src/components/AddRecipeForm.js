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
                            name, 
                            image, 
                            ingredients, 
                            instructions, 
                            personal: true 
                        };
        onAddRecipe(newRecipe);
        navigate('/');
    };

    return (
        <Container className="add-recipe-form">
            <Typography variant="h4"> 
                Add a recipe
            </Typography>
            <form onSubmit={ handleSubmit }>
                <TextField
                    label="Recipe name"
                    value={name}
                    onChange={(e) => setName(e.value.target)}
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.value.target)}
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Ingredients"
                    multiline
                    rows={4}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.value.target)}
                    fullWidth
                    margin="normal"
                    color="success"
                />
                <TextField
                    label="Instructions"
                    multiline
                    rows={4}
                    value={instructions}
                    onChange={(e) => setInstructions(e.value.target)}
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