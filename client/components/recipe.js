import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Bookmarked from "./Bookmarks";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getMe, fetchGoogleUser } from "../slices/userSlice";
import { editRecipe, selectRecipe } from "../slices/recipeSlice";

const getWinePairing = async (meal) => {
  const res = await axios.get(
    `https://api.spoonacular.com/food/wine/pairing?food=${meal.dishType}&apiKey=7d1e2814f507478498ff350fa1678752`
  );
  return res.data.pairedWines;
};

const MealDetail = ({}) => {
  const [meal, setMeal] = useState({});
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleBookmark = async () => {
    let updatedRecipe = {
      ...meal,
      mealId: meal.id,
      userId: user.id,
      isBookmarked: true,
      summary:[meal.summary],
      instructions:[meal.instructions],
      cuisines:[meal.cuisines]
    };
    dispatch(editRecipe(updatedRecipe));
  };

  const handleCooked = () => {
    let updatedRecipe = {
      ...meal,
      mealId: meal.id,
      userId: user.id,
      isCooked: true,
      summary:[meal.summary],
      instructions:[meal.instructions],
      cuisines:[meal.cuisines]
    };
    dispatch(editRecipe(updatedRecipe));
  };

  const [searchParams] = useSearchParams();
  const getMeal = async () => {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${searchParams.get(
        "recipeId"
      )}/information?apiKey=67f2eb38dc7441189476c0fd3fb74863`
    );
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
    <div className="mealCard">
      <div className="mealHeader">
        <img src={meal.image} alt={meal.title} />
          <div className="mealBookmarkIcon">
            <a href="#">
              <i className="fa fa-heart-o" onClick={handleBookmark}></i>
            </a>
          </div>
      </div>

      <div className="mealFooter">
        <h1 className="mealTitle">{meal.title}</h1>
        <i className="fa fa-clock-o"> {meal.readyInMinutes} Mins</i>
        <i className="fa fa-users"> Serves {meal.servings} </i>
        <div className="mealFooterHeaders">Meal Summary: </div>
        <p
          className="mealFooterText"
          dangerouslySetInnerHTML={{ __html: meal.summary }}
        ></p>
        <div className="mealFooterHeaders">Meal Instructions: </div>
        <p
          className="mealFooterText"
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>

        <div className="mealFooterHeaders">Wine Pairings: </div>
        <div className="mealFooterTags">
          {meal?.winePairing?.pairingText && (
            <div>{meal.winePairing.pairingText}</div>
          )}
        </div>

        <div className="mealFooterHeaders">Conforming Diets: </div>
        <div className="mealFooterTags">
          {meal?.diets?.map((diet) => (
            <div>{diet}</div>
          ))}
        </div>

        <div className="mealFooterHeaders">Cuisine: </div>
        <div className="mealFooterTags">
          {meal?.cuisines?.map((cuisine) => (
            <div>{cuisine}</div>
          ))}
        </div>
      </div>

      <div className="cookItButton">
        <button onClick={handleCooked}>Cook It!</button>
      </div>
    </div>
  );
};

export default MealDetail;
