import { Button, Card, CardMedia, CardContent, CircularProgress, List, ListItem, ListItemText, TextField, Typography, IconButton } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import TextEditor from './TextEditor.js';
import ShoppingList from './ShoppingList.js';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import { editRecipe } from '../api.js';
import './Recipe.scss';

const Recipe = ({recipes, onAddShoppingList}) => {
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update editableRecipe with the new image
                setEditableRecipe(prev => ({ ...prev, strMealThumb: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // capture the changes in editableRecipe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableRecipe(prevState => ({...prevState, [name]: value}));
    }

    // save the change that had been added 
    const handleSave = async (event) => {
        event.preventDefault();
        editableRecipe.id = id;
        try {
            const updatedRecipe = await editRecipe(editableRecipe); // or however editRecipe returns promise
            // Update local recipe state with the new data
            setEditableRecipe(prev => ({ ...prev, ...updatedRecipe }));
            // Update the recipe in the fullRecipes state
            setFullRecipes(prevRecipes => {
                const index = prevRecipes.findIndex(r => r.idMeal === updatedRecipe.idMeal);
                if (index !== -1) {
                    const updatedList = [...prevRecipes];
                    updatedList[index] = updatedRecipe;
                    return updatedList;
                } else {
                    return [...prevRecipes, updatedRecipe];
                }
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update recipe:', error);
        }
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
                    <div className='header'>
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
                            <Button color='warning' sx={{ marginTop: '20px'}} onClick={handleEditClick}>
                                <DrawIcon/>
                            </Button>
                        )}
                        <ShoppingList open={open} handleClose={handleClose} onAddShoppingList={onAddShoppingList}/>
                    </div>
                    </div>
                    
                    
                    {recipe.personal && (
                        <Typography variant='body2' color='textSecondary' className='banner'>
                            Personal Recipe
                        </Typography>
                    )}
                </div>

                {
                    isEditing ? (
                        <div>
                            <form onSubmit={handleSave}>
                                <TextField
                                    name="strMeal"
                                    label="Recipe name"
                                    value={editableRecipe.strMeal}
                                    onChange={ handleChange }
                                    fullWidth
                                    margin="normal"
                                    color="success"
                                />
                                <TextField
                                    name="strIngredients"
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
                                    name="strInstructions"
                                    label="Instructions"
                                    multiline
                                    rows={4}
                                    value={editableRecipe.strInstructions}
                                    onChange={ handleChange }
                                    fullWidth
                                    margin="normal"
                                    color="success"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >      
                                    Save
                                </Button>
                            </form>
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
                                    <li key={index}>
                                        {ingredient}
                                    </li>
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