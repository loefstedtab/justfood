import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const CookingHistory = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;


  return (
    <div>
      <h1 className="cookingHistoryTitle">Cooking History</h1>
        <div className="cookingHistoryContainer">
          {recipes.map((meal) => (
            <div className="cookingHistoryItem">
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

export default CookingHistory;
