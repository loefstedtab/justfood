import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Pantry from './Pantry';

const AllMeals = ({ history, location }) => {
  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchParams] = useSearchParams();
  const getSearchResultsByMeal = async () => {

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchParams.get('searchTerm')}&diet=${searchParams.get("filters")}&apiKey=7d1e2814f507478498ff350fa1678752`
    );
    setSuggestions(res.data.results);
  };
  const getSearchResultsByIngredients = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${searchParams.get("ingredients")}&diet=${searchParams.get("filters")}&apiKey=7d1e2814f507478498ff350fa1678752`)
    setSuggestions(res.data.results);

  }




  React.useEffect(() => {
    if (searchParams.get('searchTerm')) {
      getSearchResultsByMeal();
    }
    if (searchParams.get('ingredients')) {
      getSearchResultsByIngredients();
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
          {suggestions.map((suggestion) => (
           <li>
            <a href={`/recipe?recipeId=${suggestion.id}`}  key={suggestion.id}>{suggestion.title}  </a>
            <img src={suggestion.image} />



            </li>
          ))}
        </ul>

    </div>
  );
};

export default AllMeals;
