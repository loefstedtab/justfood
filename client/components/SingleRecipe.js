import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { editRecipe, selectRecipe } from "../slices/recipeSlice";
import { selectUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const MealDetail = () => {
  const [meal, setMeal] = useState({});
  const {user} = useSelector(selectUser);
  console.log(
    "THIS IS THE USER FROM SINGLE RECIPE",
    user,
    "This is the users recipes", user.recipes,
    "THIS IS THE MEAL ID FOR THE MEAL BEING DISPLAYED",
    meal.id
  );

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const getMeal = async () => {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${searchParams.get(
        "recipeId"
      )}/information?apiKey=d5602a4214c5474b995e183d5928322f`
    );
    setMeal(res.data);
  };

  const handleBookmark = () => {
    // isBookmarked ? false : true;
    // console.log("THIS IS ISBOOKMARKED FROM HANDLE BOOKMARK", isBookmarked);
    let updatedRecipe = {
      mealId: meal.id,
      userId: user.id,
      isBookmarked: true
    };
    dispatch(editRecipe(updatedRecipe)).then(
      console.log("THE HANDLE BOOKMARK HAS BEEN CLICKED AND DISPATCHED")
    );
  };

  const handleCooked = () => {
    // isCooked ? false : true;
    // console.log("THIS IS isCooked FROM HANDLE COOKED", isCooked);
    let updatedRecipe = {
      mealId: meal.id,
      userId: user.id,
      isCooked: true
    };
    dispatch(editRecipe(updatedRecipe));
  };

  useEffect(() => {
    getMeal();
  }, [searchParams]);

  return (
    <div key={meal.id}>
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
      <button onClick={handleBookmark}>Bookmark</button>
      <button onClick={handleCooked}>Cooked</button>
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
