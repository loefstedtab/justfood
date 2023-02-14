import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Bookmarked = () => {
  const { user } = useSelector(selectUser);
  console.log("this is the user on the bookmark page", user)
  const { recipes } = user;

  let bookmarked = recipes.filter((recipe) => recipe.isBookmarked ? recipe : null)

  return (
    <div>
      <h1 className="bookmarkTitle">Bookmarked Meals</h1>
        <div className="bookmarksContainer">
          {bookmarked.map((meal) => (
            <div key={meal.id} className="bookmarkItem">
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
