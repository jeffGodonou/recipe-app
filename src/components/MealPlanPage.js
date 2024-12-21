import React, {useState, useEffect} from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { loadMealPlan, saveMealPlans } from './localStorageUtils.js';
import Navbar from './Navbar.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './MealPlanPage.scss';

const MealPlanPage = ({ recipes }) => {
    const [mealPlan, setMealPlan] = useState({});
    const [currentMeal, setCurrentMeal] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [items, setItems] = useState([]); // table of meals
    //const [newItem, setNewItem] = useState('');
    const [showList, setShowList] = useState(false);

    useEffect (() => {
        const savedMealsPlan = loadMealPlan();
        setMealPlan(savedMealsPlan);
        setShowList(savedMealsPlan.length > 0);
    }, []);

    const handleDateClick = date => {
        setSelectedDate(date);
        setOpen(true);
    };

    const handleAddItem = () => {
        if (currentMeal.trim()) {
            setItems(prevList => [...prevList, currentMeal.trim()])
            setCurrentMeal('');
        }
    };

    const handleAddMeal = () => {
        let dateKey;
        if (selectedDate instanceof Date) {
            dateKey = selectedDate.toDateString();
        } else {
            const dateObject = new Date(selectedDate);
            if (!isNaN(dateObject)) {
                dateKey = dateObject.toDateString();
            } else {
                console.error("Invalid date:", selectedDate);
                dateKey = "Invalid Date";
            }
        }

        const updatedPlan = {
            ...mealPlan,
            [dateKey]: mealPlan[dateKey] ?
                        mealPlan[dateKey].map((meal, i) => (i === editingIndex ? items : meal)):
                        [items],
        };

        if(items.length > 0) {
            updatedPlan[dateKey] = items;
            setItems([]);
        } else { 
            delete updatedPlan[dateKey];
        }

        setMealPlan(updatedPlan);
        saveMealPlans(updatedPlan);
        setOpen(false);
        setEditingIndex(null);
    };

    const handleEditMeal = (dateKey, index) => {
        setCurrentMeal(mealPlan[dateKey][index]);
        setSelectedDate(new Date(dateKey));
        setEditingIndex(index);
        setOpen(true);
    };

    const handleRemoveMeal = (dateKey, index) => {
        // Handle error or provide user feedback
        setMealPlan(prevPlan => {
            const updatedMeals = prevPlan[dateKey].filter((_, i) => i !== index);
            const updatedPlan = { ...prevPlan, [dateKey]: updatedMeals };
            // Handle error or provide user feedback
            saveMealPlans(updatedPlan);
            return updatedPlan;
        });
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);

        if (updatedItems.length === 0) {
            const updatedPlan = { ...mealPlan };
            delete updatedPlan[selectedDate.toDateString()];
            setMealPlan(updatedPlan);
            saveMealPlans(updatedPlan);
        }
    };

    return (
        <>
        <Navbar/>
        <div className='meal-plan-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <StaticDatePicker 
                    displayStaticWrapperAs='desktop'
                    defaultValue={selectedDate}                    
                    onChange={handleDateClick}
                    slotProps={{
                        toolbar: { 
                            toolbarFormat: 'ddd DD YYYY', hidden: false
                        },
                    }}
                />
            </LocalizationProvider>

            <Grid container space={3} className='meal-plan-cards'>
                {Object.keys(mealPlan).map(
                    dateKey => {
                        if (mealPlan[dateKey].length > 0) {
                            return ((
                                <Grid item xs={12} sm={6} md={4} key={dateKey}>
                                <Card key={dateKey} sx={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} className='meal-plan-card'>
                                    <CardContent className='content'>
                                        <Typography variant='h6'> {dateKey} </Typography>
                                        {
                                            mealPlan[dateKey].map((meal, index) => (
                                                <div key={index} className='meal-item'>
                                                    <Typography variant='body1'> {meal} </Typography>
                                                    <div>
                                                        <Button onClick={() => handleRemoveMeal(dateKey, index)} startIcon={<DeleteIcon/>} color='secondary' />
                                                        <Button onClick={() => handleEditMeal(dateKey, index)} startIcon={<EditIcon/>} color='primary' />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    return null;
                })}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{backgroundColor:'rgb(18, 26, 25)', color:'white', fontFamily:'Montserrat, sans-serif', fontStyle: 'italic'}}>Add Meal</DialogTitle>
                <DialogContent className='meal-field'>
                    <div className="shopping-list-input">
                        <TextField
                            value={currentMeal}
                            onChange={(e) => setCurrentMeal(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                            label="Meal"
                            fullWidth
                            color='success'
                            sx={{ margin: '5px' }}
                        />
                        <Button onClick={handleAddItem} variant="contained" sx={{backgroundColor: 'rgb(216, 120, 24)'}}>
                            Add
                        </Button>
                    </div>
                    {showList &&
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={index} secondaryAction={ <IconButton
                                                                        edge='end'
                                                                        aria-label='delete'
                                                                        onClick={() => handleDeleteItem(index)}>
                                                                    <DeleteIcon />
                                                                    </IconButton>}>
                                                                    <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddMeal} color='primary'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    );
}

export default MealPlanPage;