export const loadMealPlan = () => {
    const savedPlans = localStorage.getItem('mealPlans');
    return savedPlans ? JSON.parse(savedPlans) : {};
}

export const saveMealPlans = (mealplans) => {
    localStorage.setItem('mealPlans', JSON.stringify(mealplans));
} 

/*export const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
} */