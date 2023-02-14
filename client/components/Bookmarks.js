import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Bookmarked = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!recipes) return;
      const mealPromises = recipes
        .filter((recipe) => recipe.isBookmarked)
        .map(async (recipe) => {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.mealId}/information?includeNutrition=false&apiKey=1b7501f3e2a744ac95ac18898a19f22b`
          );
          return response.data;
        });
      const mealsData = await Promise.all(mealPromises);
      setMeals(mealsData);
    };
    fetchRecipes();
  }, [recipes]);

  return (
    <div>
      <h1 className="bookmarkTitle">Bookmarked Meals</h1>
        <div className="bookmarksContainer">
          {meals.map((meal) => (
            <div className="bookmarkItem">
              <h2>
              <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
              </h2>
              <img src={meal.image} alt={meal.title} />
            </div>
          ))}
        </div>
    </div>
  );
};
export default Bookmarked;
