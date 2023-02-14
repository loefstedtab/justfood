import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const CookingHistory = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;


  return (
    <div>
      <h1>Cooking History</h1>
      {recipes.map((meal) => (
        <div className="cooking-history-list">
          <h2>
          <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
            </h2>
            <h2>Cooked On: {meal.createdAt}</h2>
          <img src={meal.image} alt={meal.title} />
        </div>
      ))}
    </div>
  );
};

export default CookingHistory;
