import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect( () => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.log("Error met while fetching the details of the recipe");
            }
        };

        fetchRecipe()
    }, [id]);

    if(!recipe)
        return <div> Loading... </div>;

    return (
        <div>
            <h1> {recipe.strMeal} </h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p> {recipe.strInstructions} </p>

            <ul>
                {   
                    Object.keys(recipe).filter((key) => key.startsWith('strIngredient') && recipe[key])
                        .map((key) => (
                                <li key={key}>{recipe[key]}</li>
                        ))
                }
            </ul>
        </div>
    );
};

export default Recipe;