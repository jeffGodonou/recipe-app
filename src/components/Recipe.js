import { Button, Card, CardMedia, CardContent, CircularProgress, List, ListItem, ListItemText, TextField, Typography, IconButton } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import TextEditor from './TextEditor.js';
import ShoppingList from './ShoppingList.js';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import './Recipe.scss';

const Recipe = ({recipes, updateRecipe, onAddShoppingList}) => {
    const { id } = useParams();
    const [ fullRecipes, setFullRecipes] = useState(recipes);
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('');
    const [ presentNotes, setPresentNotes ] = useState(false);
    const [ open, setOpen ] = useState(false);
    
    const handleClickOpen = ()=> { setOpen(true) };

    const handleClose = () => { setOpen(false) };

    useEffect( () => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if ( data && data.meals ) {
                    setFullRecipes([...recipes, ...data.meals||[]]);
                } else {
                    console.log("No recipe found with the given id:", id);
                }
                
            } catch (error) {
                console.log("Error met while fetching the details of the recipe:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchRecipe()
    }, [id, recipes]);

    useEffect(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem(`recipe-notes-${id}`)) || [];
            setNotes(savedNotes);
            if (savedNotes.length > 0) {
                setPresentNotes(true);
            }
        } catch (error) {
            console.log("Error met while fetching the notes of the recipe:", error);
            setNotes([]);
        }
    }, [id]);

    const recipe = fullRecipes.find(r => r.idMeal === id);
    const [ isEditing,  setIsEditing ] = useState(false);
    const [ editableRecipe, setEditableRecipe ] = useState({});

    useEffect(() => {
        const recipe = fullRecipes.find(r => r.idMeal === id);
        setEditableRecipe(recipe || {});
    }, [fullRecipes, id]);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleNotesChange = useCallback( (content) => {
        setNewNote(content);
    }, []);

    // capture the changes in editableRecipe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableRecipe(prevState => ({...prevState, [name]: value}));
    }

    // save the change that had been added 
    const handleSave = () => {
        updateRecipe(editableRecipe);
        setIsEditing(false);
    }

    const handleAddNote = () => {
        if (newNote.trim()) {
            const updatedNotes = [...notes, newNote.trim()];
            setNotes(updatedNotes);
            setNewNote('');
            localStorage.setItem(`recipe-notes-${id}`, JSON.stringify(updatedNotes));
        }

        if (!presentNotes) {
            setPresentNotes(true);
        }
    }

    const handleDeleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        localStorage.setItem(`recipe-notes-${id}`, JSON.stringify(updatedNotes));
        if (updatedNotes.length === 0) {
            setPresentNotes(false);
        }
    }

    if (loading) 
        return <CircularProgress  color="success"/>

    if(!recipe)
        return <div> There is no recipe to show :( </div>;

    const ingredients = recipe.strIngredients ? recipe.strIngredients.split(',') : [];
    const instructions = recipe.strInstructions ? recipe.strInstructions.split(/(?:Step \d+|\.|:)/).filter(instruction => instruction.trim() !== '') : []

    return (
        <Card key={recipe.idMeal} sx={{backgroundColor: 'rgb(173, 51, 10)'}} className="recipe-card">
            <div className='image-container'>
                <CardMedia 
                    component = "img"
                    height = "140"
                    image = { recipe.strMealThumb }
                    alt = { recipe.strMeal }
                />
            </div>

            <CardContent sx={{backgroundColor: 'rgb(216, 120, 24)'}} >
                <div className='header-div'> 
                    <Typography 
                        gutterBottom variant = "h4" 
                        component = "div" 
                        className='recipe-name'
                    >
                        { recipe.strMeal }
                    </Typography>
                    <div>
                        <Button color='warning' sx={{ marginTop: '20px'}} onClick={() => handleClickOpen()}>
                            <AddShoppingCartIcon/>
                        </Button>
                        <Button component={Link} color='warning' sx={{ marginTop: '20px'}} to='/'>
                            <HomeTwoToneIcon/>
                        </Button>
                        {recipe.personal && (
                            <Button variant="contained" onClick={handleEditClick}>
                                Edit
                            </Button>
                        )}
                        <ShoppingList open={open} handleClose={handleClose} onAddShoppingList={onAddShoppingList}/>
                    </div>
                </div>
                {recipe.personal && (
                    <Typography variant='body2' color='textSecondary'>
                        Personal Recipe
                    </Typography>
                )}

                {
                    isEditing ? (
                        <div>
                            <TextField
                                label="Recipe name"
                                value={editableRecipe.strMeal}
                                onChange={ handleChange }
                                fullWidth
                                margin="normal"
                                color="success"
                            />
                            <TextField
                                label="Ingredients"
                                multiline
                                rows={4}
                                value={editableRecipe.strIngredients}
                                onChange={ handleChange }
                                fullWidth
                                margin="normal"
                                color="success"
                            />
                            <TextField
                                label="Instructions"
                                multiline
                                rows={4}
                                value={editableRecipe.strInstructions}
                                onChange={ handleChange }
                                fullWidth
                                margin="normal"
                                color="success"
                            />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={ handleSave }
                            >      
                                Save
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Typography variant="h6">
                                Ingredients
                            </Typography>
                                <ul>
                                    {!recipe.personal && (Object.keys(recipe).filter((key) => key.startsWith('strIngredient') && recipe[key])
                                        .map((key) => (
                                            <li key={key}>
                                                {recipe[key]}
                                            </li>))) }
                                    {ingredients.map((ingredient, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={ingredient} />
                                        </ListItem>
                                    ))}
                                </ul>
                                
                                <List className="instructions-list">
                                    <Typography variant="h6">
                                        Instructions
                                    </Typography>
                                    {instructions.map((instruction, index) => (instruction && (
                                        <ListItem key={index}>
                                            <ListItemText primary={instruction} className='instructions-text' />
                                        </ListItem>
                                        )
                                    ))}
                                </List>
                            </>
                        )
                }

                <Typography variant="h6">Notes</Typography>

                {presentNotes && (
                    <List sx={{marginTop: '2rem'}}>
                        {notes.map((note, index) => (
                            <>
                                <ListItem key={index}>
                                    <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: note}} />} />
                                </ListItem>
                                <IconButton edge='end' aria-label='delete' onClick={() => handleDeleteNote(index)}> 
                                    <DeleteIcon />  
                                </IconButton>
                            </>
                        ))}
                    </List>
                )}

                <TextEditor
                    label="Your notes"
                    fullWidth
                    value={newNote}
                    onChange={handleNotesChange}
                    color="success"
                />
                
                <Button variant="contained" onClick={() => handleAddNote()} style={{ marginTop: '10px', backgroundColor: 'rgb(18, 26, 25)'}}>
                    Save Notes
                </Button>
            </CardContent>        
        </Card>
    )
};

export default Recipe;