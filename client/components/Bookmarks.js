import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
const Bookmarked = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;
  console.log("recipes from bookmark", recipes);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      if (recipes) {
        const promiseArray = recipes.map((recipe) => {
          if (recipe.isBookmarked) {
            return axios.get(
              `https://api.spoonacular.com/recipes/${recipe.mealId}/information?includeNutrition=false&apiKey=1b7501f3e2a744ac95ac18898a19f22b`
            );
          }
        });
        const results = await Promise.all(promiseArray);
        setMeals(results.map((result) => console.log('DATA FROM MAP LINE 21', result.data)));
      }
    };
    fetchRecipes();
  }, [recipes]);
  console.log('MEALS FROM LINE 26', meals)
  return (
    <div>
      <h1>Bookmarked Meals</h1>
      {meals.map((meal) => (
        <div className="bookmark-list">
          <h2>{meal.title}</h2>
          <img src={meal.image} alt={meal.title} />
        </div>
      ))}
    </div>
  );
};
export default Bookmarked;
