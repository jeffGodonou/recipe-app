import { Button, Card, CardMedia, CardContent, Typography, CircularProgress, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
    const { id } = useParams();
    const [ recipe, setRecipe ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState('');

    useEffect( () => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setRecipe(data.meals[0]);
                const savedNotes = localStorage.getItem(`recipe-notes-${id}`);
                if(savedNotes)
                    setNotes(savedNotes);
            } catch (error) {
                console.log("Error met while fetching the details of the recipe");
            } finally{
                setLoading(false);
            }
        };

        fetchRecipe()
    }, [id]);

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    }

    const handleSaveNotes = () => {
        localStorage.setItem(`recipe-notes-${id}`, notes);
    }

    if (loading) 
        return <CircularProgress />

    if(!recipe)
        return <div> There is no recipe to show :( </div>;

    const instructions = recipe.strInstructions.split('. ').map((instruction, index) => {
        return instruction.trim() ? `${index + 1}. ${instruction.trim()}.` : '';
    });

    return (
        <Card key={recipe.idMeal}>
            <CardMedia 
                component = "img"
                height = "140"
                image = { recipe.strMealThumb }
                alt = { recipe.strMeal }
            />  
            <CardContent>
                <Typography gutterBottom variant = "h4" component = "div">
                    { recipe.strMeal }
                </Typography>
                <Typography variant = "h6" > 
                    Ingredients
                </Typography>
                <ul>
                    {
                        Object.keys(recipe).filter(( key ) => key.startsWith('strIngredient') && recipe[key])
                                            .map(( key ) => (
                                                <li key = { key } >
                                                    { recipe[key] }
                                                </li>))
                    }
                </ul>
                <Typography variant = "h6" > 
                    Instructions
                </Typography>
                <List textColor="textSecondary">
                    { 
                        instructions.map((instruction, index) => ( instruction && (
                            <ListItem key={index}>
                                <ListItemText primary={instruction} />
                            </ListItem>
                            )
                    ))}
                </List>
                <Typography variant="h6">Notes</Typography>
                <TextField
                    label="Your notes"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={notes}
                    onChange={handleNotesChange}
                />
                <Button variant="contained" color="primary" onClick={handleSaveNotes} style={{ marginTop: '10px' }}>
                    Save Notes
                </Button>
            </CardContent>        
        </Card>
    )
};

export default Recipe;