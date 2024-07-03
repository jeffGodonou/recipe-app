import { Button, Card, CardMedia, CardContent, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor.js';
import ShoppingList from './ShoppingList.js';
import './Recipe.scss';

const Recipe = ({recipes, onAddShoppingList}) => {
    const { id } = useParams();
    const [ fullRecipes, setFullRecipes] = useState(recipes);
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = ()=> { setOpen(true) };

    const handleClose = () => { setOpen(false) };

    useEffect( () => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setFullRecipes([...recipes, ...data.meals||[]]);
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
    }, [id, recipes, setFullRecipes]);
    
    const recipe = fullRecipes.find(r => r.idMeal === id);

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    }

    const handleSaveNotes = () => {
        localStorage.setItem(`recipe-notes-${id}`, notes);
    }

    if (loading) 
        return <CircularProgress  color="success"/>

    if(!recipe)
        return <div> There is no recipe to show :( </div>;

    const ingredients = recipe.strIngredients ? recipe.strIngredients.split(',') : [];
    const instructions = recipe.strInstructions ? recipe.strInstructions.split(/\.|STEP/) : [];

    return (
        <Card key={recipe.idMeal} className="recipe-card">
            <div className='image-container'>
                <CardMedia 
                    component = "img"
                    height = "140"
                    image = { recipe.strMealThumb }
                    alt = { recipe.strMeal }
                />
            </div>

            <CardContent>
                <div className='header-div'> 
                    <Typography 
                        gutterBottom variant = "h4" 
                        component = "div" 
                        className='recipe-name'
                    >
                        { recipe.strMeal }
                    </Typography>
                    <Button
                        variant="contained"
                        
                        onClick={() => handleClickOpen()}    
                    >
                        Shopping list
                    </Button>
                    <ShoppingList open={open} handleClose={handleClose} onAddShoppingList={onAddShoppingList}/>
                </div>
                
                {recipe.personal && (
                    <Typography variant='body2' color='textSecondary'>
                        Personal Recipe
                    </Typography>
                )}
                <Typography variant = "h6" > 
                    Ingredients
                </Typography>
                <ul>
                    {
                        Object.keys(recipe).filter(( key ) => key.startsWith('strIngredient') && recipe[key])
                                            .map(( key ) => (
                                                <li key = { key } >
                                                    { recipe[key] }
                                                </li>))}
                    {
                        ingredients.map((ingredient, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={ingredient} />
                            </ListItem>
                        ))
                    }
                </ul>
                <Typography variant = "h6" > 
                    Instructions
                </Typography>
                <List className="instructions-list">
                    { 
                        instructions.map((instruction, index) => ( instruction && (
                            <ListItem key={index}>
                                <ListItemText primary={instruction} className='instructions-text'/>
                            </ListItem>
                            )
                    ))}
                </List>
                <Typography variant="h6">Notes</Typography>
                <TextEditor
                    label="Your notes"
                    fullWidth
                    value={notes}
                    onChange={handleNotesChange}
                    color="success"
                />
                
                <Button variant="contained" color="success" onClick={handleSaveNotes} style={{ marginTop: '10px' }}>
                    Save Notes
                </Button>
            </CardContent>        
        </Card>
    )
};

export default Recipe;