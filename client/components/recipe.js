import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Bookmarked from './Bookmarks';

const getWinePairing = async (meal) => {
  const res = await axios.get(`https://api.spoonacular.com/food/wine/pairing?food=${meal.dishType}&apiKey=67f2eb38dc7441189476c0fd3fb74863`)
  return res.data.pairedWines;
};

const MealDetail = ({ }) => {
  const [meal, setMeal] = useState({});
  const [showBookmarked, setShowBookmarked] = useState(false);

  const handleBookmarkClick = (mealId) => {
   
  };
  
  const [searchParams] = useSearchParams();
  const getMeal = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/${searchParams.get("recipeId")}/information?apiKey=67f2eb38dc7441189476c0fd3fb74863`)
      setMeal(res.data);
  };

  const [pairedWines, setPairedWines] = useState([]);


  useEffect(() => {
    getMeal().then((meal) => {
      if (meal) {
      getWinePairing(meal).then((wines) => {
        setPairedWines(wines);
      });
    }
    });
  }, [searchParams]);

  return (
    <div>
      <h1>{meal.title}</h1>
        <img src={meal.image} alt={meal.title} />
        <div dangerouslySetInnerHTML={{ __html: meal.summary }}></div>
      
        <div dangerouslySetInnerHTML={{ __html: meal.instructions }}></div>
        <div>
          <h2>Wine Pairings</h2>
          <ul>
          {meal?.winePairing?.pairedWines?.map((wine) => (
          <p>{wine}</p>
        ))}
        {meal?.winePairing?.productMatches?.map((product) => (
          <p>{product.title}</p>
        ))}
        {meal?.winePairing?.pairingText && (
          <p>{meal.winePairing.pairingText}</p>
        )}
            {pairedWines.map((wine) => (
              <li>{wine}</li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={() => handleBookmarkClick(meal.id)}>Bookmark</button>
        </div>

        <p>Ready in {meal.readyInMinutes} Minutes</p>
        <p>Makes {meal.servings} servings</p>
        {meal?.dishTypes?.map((dishType) => (
          <p>{dishType}</p>
        ))}
        {meal?.foodTypes?.map((foodType) => (
          <p>{foodType}</p>
        ))}
        {meal?.diets?.map((diet) => (
          <p>{diet}</p>
        ))}
        {meal?.cuisines?.map((cuisine) => (
          <p>{cuisine}</p>
        ))}

        {meal?.occasions?.map((occasion) => (
          <p>{occasion}</p>
        ))}
        
    </div>


  );
};

export default MealDetail;

