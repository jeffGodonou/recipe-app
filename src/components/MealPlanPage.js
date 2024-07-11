import React, {useState, useEffect} from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { loadMealPlan, saveMealPlans } from './localStorageUtils.js';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import './MealPlanPage.scss';

const MealPlanPage = ({ recipes }) => {
    const [mealPlan, setMealPlan] = useState({});
    const [currentMeal, setCurrentMeal] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect (() => {
        const savedMealsPlan = loadMealPlan();
        setMealPlan(savedMealsPlan);
    }, []);

    const handleDateClick = date => {
        setSelectedDate(date);
        setOpen(true);
    };

    const handleAddMeal = () => {
        const dateKey = selectedDate.toDateString();
        const updatedPlan = {
            ...mealPlan,
            [dateKey]: mealPlan[dateKey] ?
                        mealPlan[dateKey].map((meal, i) => (i === editingIndex ? currentMeal : meal)):
                        [currentMeal],
        };
        setMealPlan(updatedPlan);
        saveMealPlans(updatedPlan);
        setCurrentMeal('');
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
        setMealPlan(prevPlan => {
            const updatedMeals = prevPlan[dateKey].filter((_, i) => i !== index);
            const updatedPlan = { ...mealPlan, [dateKey]: updatedMeals };
            setMealPlan(updatedPlan);
            saveMealPlans(updatedPlan);
        });
    };

    return (
        <div className='meal-plan-container'>
            <div className='header-div'>
                <Typography variant='h4' className='title'> Meal Plan </Typography>
                <Button component={Link} to='/' variant='contained' className='home-button'>
                    <HomeTwoToneIcon/>
                </Button>
            </div>
            
            <LocalizationProvider dateAdapter={AdapterDateFns} className='date-setter'>
                <DatePicker 
                    date={selectedDate} 
                    onChange={handleDateClick}
                    renderInput={(params) => <TextField {...params} /> } 
                />
            </LocalizationProvider>

            <Grid container space={3} className='meal-plan-cards'>
                {Object.keys(mealPlan).map(
                    dateKey => (
                        <Grid item xs={12} sm={6} md={4} key={dateKey}>
                            <Card key={dateKey} sx={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} className='meal-plan-card'>
                                <CardContent className='content'>
                                    <Typography variant='h6'> {dateKey} </Typography>
                                    {
                                        mealPlan[dateKey].map((meal, index) => (
                                            <div key={index} className='meal-item'>
                                                <Typography variant='body1'> {meal} </Typography>
                                                <div>
                                                    <Button onClick={() => handleRemoveMeal(dateKey, index)} color='secondary'>
                                                        Remove
                                                    </Button>
                                                    <Button onClick={()=> handleEditMeal(dateKey, index)} color='primary'> Edit </Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Meal</DialogTitle>
                <DialogContent className='meal-field'>
                    <TextField
                        value={currentMeal}
                        onChange={(e) => setCurrentMeal(e.target.value)}
                        label="Meal"
                        fullWidth
                        color='success'
                        sx={{ margin: '5px' }}
                    />
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
    );
}

export default MealPlanPage;