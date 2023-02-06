import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const MealDetail = ({ match }) => {
  const [meal, setMeal] = useState({});
  
  const [searchParams] = useSearchParams();
  const getMeal = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/${searchParams.get("recipeId")}/information?apiKey=67f2eb38dc7441189476c0fd3fb74863`)
      setMeal(res.data);
  };

    


  useEffect(() => {
   getMeal ();
    
  }, [searchParams]);

  return (
    <div>
      <h1>{meal.title}</h1>
        <img src={meal.image} alt={meal.title} />
        <div dangerouslySetInnerHTML={{
          __html: meal.summary
        }}
        ></div>
        <p>{meal.sourceUrl}</p>
        <p>{meal.sourceName}</p>
        {meal?.dishTypes?.map((dishType) => (
          <p>{dishType}</p>
        ))}
        {meal?.diets?.map((diet) => (
          <p>{diet}</p>
        ))}
        {meal?.cuisines?.map((cuisine) => (
          <p>{cuisine}</p>
        ))}


        
        
        {/* <p>{meal.occasions}</p>
        <p>{meal.winePairing}</p>
        
        <p>{meal.nutrition}</p>
        <p>{meal.nutrition.nutrients}</p>    
      <p>{meal.instructions}</p>
        <p>Servings: {meal.servings}</p>
        <p>Health Score: {meal.healthScore}</p>
      <p>Cooking Time: {meal.cookingMinutes} minutes</p>
      <p>Preparation Time: {meal.preparationMinutes} minutes</p>
      <p>Ready In: {meal.readyInMinutes} minutes</p> */} 
    </div>
  );
};

export default MealDetail;


