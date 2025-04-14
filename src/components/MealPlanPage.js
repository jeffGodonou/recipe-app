/*import React, {useState, useEffect} from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { PencilSimpleLine, X, TrashSimple } from 'phosphor-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { loadMealPlan, saveMealPlans } from './localStorageUtils.js';
import Navbar from './Navbar.js';
import './MealPlanPage.scss';

const MealPlanPage = ({ recipes }) => {
    const [mealPlan, setMealPlan] = useState({});
    const [currentMeal, setCurrentMeal] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [items, setItems] = useState([]); // table of meals
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
                                                        <Button onClick={() => handleEditMeal(dateKey, index)} color='inherit'> 
                                                            <PencilSimpleLine size={14}/>
                                                        </Button>
                                                        <Button onClick={() => handleRemoveMeal(dateKey, index)} color='inherit'> 
                                                            <TrashSimple size={14}/> 
                                                        </Button>
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
                                                                    <X />
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
} */

    import React, { useState, useEffect } from 'react';
    import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
    import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Category, Tooltip, Legend, DataLabel, Inject as ChartInject } from '@syncfusion/ej2-react-charts';
    import { getMealPlans, addMealPlan, updateMealPlan, deleteMealPlan } from '../api.js';
    import Navbar from './Navbar.js';
    import '@syncfusion/ej2-base/styles/material.css';
    import '@syncfusion/ej2-buttons/styles/material.css';
    import '@syncfusion/ej2-calendars/styles/material.css';
    import '@syncfusion/ej2-dropdowns/styles/material.css';
    import '@syncfusion/ej2-inputs/styles/material.css';
    import '@syncfusion/ej2-navigations/styles/material.css';
    import '@syncfusion/ej2-popups/styles/material.css';
    import '@syncfusion/ej2-splitbuttons/styles/material.css';
    import '@syncfusion/ej2-react-schedule/styles/material.css';
    import '@syncfusion/ej2-react-charts';
    import './MealPlanPage.scss';
    
    const MealPlanPage = () => {
        const [mealPlan, setMealPlan] = useState([]);
        
        // Fetch meal plans from the server when the component loads
        useEffect(() => {
            const fetchMeals = async () => {
                try {
                    const meals = await getMealPlans();
                    setMealPlan(meals);
                } catch (error) {
                    console.error('Failed to fetch meals:', error);
                }
            };
            fetchMeals();
        }, []);
    
        let dataSource = [];
        try {
            dataSource = mealPlan.map((meal, index) => ({
                Id: index + 1,
                Subject: meal.name,
                StartTime: new Date(meal.date),
                EndTime: new Date(new Date(meal.date).setHours(new Date(meal.date).getHours() + 1))
            }));
        } catch (e) {
            console.error(e);
        }

        // Define the event settings for the schedule component
        const eventSettings = {
            dataSource: dataSource
        };
    
        const handleActionComplete = async (args) => {
            try{
                if (args.requestType === 'eventCreated') {
                    const newMeals = args.data.map(event => ({
                        name: event.Subject,
                        date: event.StartTime
                    }));
                    const savedMeals = await Promise.all(newMeals.map(addMealPlan));
                    setMealPlan(prev => [...prev, ...savedMeals]);
                } else if (args.requestType === 'eventChanged') {
                    const updatedMeals = args.data.map(event => ({
                        id: event.Id,
                        name: event.Subject,
                        date: event.StartTime
                    }));
                    const savedMeals = await Promise.all(updatedMeals.map(updateMealPlan));
                    setMealPlan(prev => prev.map(meal => savedMeals.find(m => m.id === meal.id) || meal));
                } else if (args.requestType === 'eventRemoved') {
                    const removedMeals = args.data.map(event => ({
                        id: event.Id
                    }));
                    await Promise.all(removedMeals.map(deleteMealPlan));
                    setMealPlan(prev => prev.filter(meal => !removedMeals.some(m => m.id === meal.id)));
                }
            } catch (error) {
                console.error('Failed to update meals:', error);
            }
        };
    
        // Prepare data for the chart
        // Assuming mealPlan is an array of objects with a date property
        const chartData = mealPlan.reduce((acc, meal) => {
            const date = new Date(meal.date).toDateString();
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date]++;
            return acc;
        }, {});
    
        const chartSeries = Object.keys(chartData).map(date => ({
            x: date,
            y: chartData[date]
        }));
    
        return (
            <>
                <Navbar />
                <div className='meal-plan-container'>
                    <ScheduleComponent
                        currentView='Month'
                        eventSettings={eventSettings}
                        actionComplete={handleActionComplete}
                    >
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                    <ChartComponent
                        primaryXAxis={{ valueType: 'Category' }}
                        title='Meal Plan Habits'
                    >
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartSeries} xName='x' yName='y' type='Column' />
                        </SeriesCollectionDirective>
                        <ChartInject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />
                    </ChartComponent>
                </div>
            </>
        );
    };
    
        
export default MealPlanPage;