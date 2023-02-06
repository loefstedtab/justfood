import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AllMeals = ({ history, location }) => {
  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchParams] = useSearchParams();
  const getSearchResults = async () => {
    
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchParams.get('searchTerm')}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
    );
    setSuggestions(res.data.results);
  };
  const getSearchResultsByIngredients = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchParams.get("ingredients")}&apiKey=67f2eb38dc7441189476c0fd3fb74863`)
    setSuggestions(res.data);
  }




  React.useEffect(() => {
    if (searchParams.get('searchTerm')) {
      getSearchResults();
    }
    if (searchParams.get('ingredients')) {
      getSearchResultsByIngredients();
    }
  }, [searchParams]);

  return (
    <div>
      {/* {meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>{meal.title}</li>
          ))}
        </ul>
      ) : (
        <p>No meals to display</p>
      )} */} 
      <ul>
          {suggestions.map((suggestion) => (
           <li> 
            <a href={`/recipe?recipeId=${suggestion.id}`}  key={suggestion.id}>{suggestion.title}  </a>
            <img src={suggestion.image} />
            <p>Ready in {suggestion.readyInMinutes} minutes</p> 
            {/* <p>Servings: {suggestion.servings}</p> add all recipes info here */}

            </li>
          ))}
        </ul>
    </div>
  );
};

export default AllMeals;
