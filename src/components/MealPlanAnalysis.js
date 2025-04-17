import React, { useState } from 'react';
import { ChartComponent, ColumnSeries, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts';

const MealPlanAnalysis = () => {
    const [chartData, setChartData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchAnalysisData = async () => {
        try {
            const query = new URLSearchParams ({
                keyword,
                startDate,
                endDate
            }).toString();

            const response = await fetch(`http://localhost:5000/api/mealPlan/analyze?${query}`);
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('Error fetching analysis data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAnalysisData();
    };

    return (
        <div className="meal-plan-analysis">
            <h2>Meal Plan Analysis</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={handleSubmit}>Analyze</button>
            </div>
            
            <ChartComponent id='charts' primaryXAxis={{ valueType: 'Category' }} title='Meal Frequency Analysis'>
                <Inject services={[ColumnSeries, Legend, Tooltip, Category]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={chartData} xName='x' yName='y' name='Meals' type='Column' />
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    )
}

export default MealPlanAnalysis;