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
import MealPlanAnalysis from './MealPlanAnalysis.js';
    
    const MealPlanPage = () => {
        const [mealPlan, setMealPlan] = useState([]);
        const [view, setView] = useState('habitChart');
        
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
            dataSource = mealPlan.map((meal) => ({
                Id: Date.now().toString(),
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
                        id: event.Id,
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
                    
                    <div className='sidebar'>
                        <button onClick={() => setView('habitChart')}>Habit Chart</button>
                        <button onClick={() => setView('analysis')}>Analysis</button>
                    </div>
                    <div className='content'>
                        { view === 'habitChart' && (
                            <ChartComponent
                                primaryXAxis={{ valueType: 'Category' }}
                                title='Meal Plan Habits'
                            >
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={chartSeries} xName='x' yName='y' type='Column' />
                                </SeriesCollectionDirective>
                                <ChartInject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />
                            </ChartComponent>
                        )}
                        { view === 'analysis' && ( 
                            <MealPlanAnalysis />
                        )}
                    </div>
                    <ScheduleComponent
                        id='schedule'
                        width='100%'
                        height='93vh'
                        currentView='Month'
                        eventSettings={eventSettings}
                        actionComplete={handleActionComplete}
                    >
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                </div>
            </>
        );
    };
    
        
export default MealPlanPage;