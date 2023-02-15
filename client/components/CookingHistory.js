import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const CookingHistory = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;

  let cooked = recipes ? recipes.filter((recipe) => recipe.isCooked) : null;

  return (
    <div>
      <h1 className="cookingHistoryTitle">Cooking History</h1>
      <div className="cookingHistoryContainer">
        {cooked
          ? cooked.map((meal) => (
              <div key={meal.id} className="cookingHistoryItem">
                <h2>
                  <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
                </h2>
                <img src={meal.image} alt={meal.title} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CookingHistory;
