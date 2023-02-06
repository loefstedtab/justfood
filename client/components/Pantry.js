import React, { useState } from 'react';
import axios from 'axios';

const Pantry = ({ingredients,setIngredients}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);

    if (!e.target.value) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${e.target.value}&apiKey=67f2eb38dc7441189476c0fd3fb74863`)
      .then(({ data }) => setSuggestions(data))
      .catch((error) => console.error(error));
  };

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]); 
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    console.log(ingredientToRemove)
    const filteredIngredients = ingredients.filter((ingredient) => ingredient.name !== ingredientToRemove.name)
    setIngredients(filteredIngredients);
  };

  return (
    <div>
      <form>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
        {suggestions.map((suggestion) => (
          <div key={suggestion} >
            {suggestion.name}
            <button onClick={() => handleAddIngredient(suggestion)} type="button">Add</button>
          </div>
        ))}
      </form>
      <ul>
    {ingredients.map((ingredient) => (
      <li key={ingredient.name}>
        {ingredient.name}
        <button onClick={() => handleRemoveIngredient(ingredient)}>Remove</button>
      </li>
    ))}
  </ul>
    </div>
  );
};

export default Pantry;

