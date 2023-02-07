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
    </div>
  );
};

export default MealDetail;


