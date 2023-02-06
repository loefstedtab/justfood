import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pantry from './Pantry';
import Filter from './filters';



const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
const navigate = useNavigate();
  const handleSearchTermChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      setSuggestions([]);
      return;
    }

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${e.target.value}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
    );
    setSuggestions(res.data.results.slice(0, 5));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
    navigate(`/allrecipes?searchTerm=${searchTerm}`)
    } 
    if (ingredients.length > 0) {
      navigate(`/allrecipes?ingredients=${ingredients.map(ingredient => ingredient.name).join(',')}`)
    }



    // const res = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
    // );
    // history.push ({
    //   pathname: '/allRecipes',
    //   state: { meals: res.data.results }
    // });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search for a meal"
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
           <li> <a href={`/recipe?recipeId=${suggestion.id}`} key={suggestion.id}>{suggestion.title}  </a></li>
          ))}
        </ul>
      )}

      <Pantry ingredients = {ingredients} setIngredients = {setIngredients} />

      <Filter />
    </div>
  );
};

export default Home;





