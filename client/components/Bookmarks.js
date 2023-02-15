import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { editRecipe } from "../slices/recipeSlice";

const Bookmarked = () => {
  const { user } = useSelector(selectUser);
  const { recipes } = user;

  const dispatch = useDispatch();

  const handleRemove = async (meal) => {
    let updatedRecipe = {
      ...meal,
      mealId: meal.id,
      userId: user.id,
      isBookmarked: false,
      summary: [meal.summary],
      instructions: [meal.instructions],
      cuisines: [meal.cuisines],
    };
    dispatch(editRecipe(updatedRecipe));
  };

  let bookmarked = recipes
    ? recipes.filter((recipe) => recipe.isBookmarked)
    : null;

  return (
    <div>
      <h1 className="bookmarkTitle">Bookmarked Meals</h1>
      <div className="bookmarksContainer">
        {bookmarked
          ? bookmarked.map((meal) => (
              <div key={meal.id} className="bookmarkItem">
                <h2>
                  <a href={`/recipe?recipeId=${meal.id}`}>{meal.title}</a>
                </h2>
                <img src={meal.image} alt={meal.title} />
                <button onClick={() => handleRemove(meal)}>
                  Remove Bookmark
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default Bookmarked;
