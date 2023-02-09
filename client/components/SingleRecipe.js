import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { editRecipe, selectRecipe } from "../slices/recipeSlice";
import {selectUser} from "../slices/userSlice"
import { useDispatch, useSelector } from "react-redux";


const MealDetail = ({ match }) => {
  const [meal, setMeal] = useState({});
  const user = useSelector(selectUser)
  console.log("THIS IS THE USER FROM SINGLE RECIPE", user, meal.id)

  const [searchParams] = useSearchParams();
  const getMeal = async () => {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${searchParams.get(
        "recipeId"
      )}/information?apiKey=7d1e2814f507478498ff350fa1678752`
    );
    setMeal(res.data);
  };

  const handleBookmark = () => {
    updatedRecipe = {
      mealId : meal.id,
      isBookmarked: true,
      userId: user.id
    }
  }

  const handleCooked = () => {
    updatedRecipe = {
      mealId : meal.id,
      isCooked: true,
      userId: user.id
    }
  }

  useEffect(() => {
    getMeal();
  }, [searchParams]);

  return (
    <div>
      <h1>{meal.title}</h1>
      <img src={meal.image} alt={meal.title} />
      <div
        dangerouslySetInnerHTML={{
          __html: meal.summary,
        }}
      ></div>

      <div
        dangerouslySetInnerHTML={{
          __html: meal.instructions,
        }}
      ></div>
      <div>
        <button onClick={() => {handleBookmark}}>Bookmark</button>
        <button onClick={() => {handleCooked}}>Cooked</button>
      </div>

      <p>Ready in {meal.readyInMinutes} Minutes</p>
      <p>Makes {meal.servings} servings</p>
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
