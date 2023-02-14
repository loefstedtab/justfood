import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Bookmarked = () => {
  const { user } = useSelector(selectUser);
  console.log("this is the user on the bookmark page", user)
  const { recipes } = user;

  return (
    <div>
      <h1>Bookmarked Meals</h1>
      {recipes.map((meal) => (
        <div className="bookmark-list">
          <h2>
          <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
          {meal.title}
          </h2>
          <img src={meal.image} alt={meal.title} />
        </div>
      ))}
    </div>
  );
};
export default Bookmarked;
