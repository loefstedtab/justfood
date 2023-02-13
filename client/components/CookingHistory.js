import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const CookingHistory = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchCookingHistory = async () => {
      if (!recipes) return;
      const mealPromises = recipes
        .filter((recipe) => recipe.isCooked)
        .map(async (recipe) => {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.mealId}/information?includeNutrition=false&apiKey=1b7501f3e2a744ac95ac18898a19f22b`
          );
          return response.data;
        });
      const mealsData = await Promise.all(mealPromises);
      setMeals(mealsData);
    };
    fetchCookingHistory();
  }, [recipes]);

  return (
    <div>
      <h1>Cooking History</h1>
      {meals.map((meal) => (
        <div className="cooking-history-list">
          <h2>
          <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
            </h2>
          <img src={meal.image} alt={meal.title} />
        </div>
      ))}
    </div>
  );
};

export default CookingHistory;
