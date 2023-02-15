import React, { useState } from "react";
import axios from "axios";

const Pantry = ({ ingredients, setIngredients, handleFormSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);

    if (!e.target.value) {
      setSuggestions([]);
      return;
    }

    axios
      .get(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${e.target.value}&apiKey=7d1e2814f507478498ff350fa1678752`
      )
      .then(({ data }) => setSuggestions(data))
      .catch((error) => console.error(error));
  };

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    console.log(ingredientToRemove);
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== ingredientToRemove.name
    );
    setIngredients(filteredIngredients);
  };

  return (
    <div className="ingredientResultContainer">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by Ingredients"
        />
        <button type="submit">Search</button>
        {suggestions.map((suggestion) => (
          <div key={suggestion}>
            {suggestion.name}
            <button
              onClick={() => handleAddIngredient(suggestion)}
              type="button"
            >
              Add
            </button>
          </div>
        ))}
      </form>
      <ul className="PantryContainer">
        {" "}
        Ingredients in your Pantry:
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.name}
            <button onClick={() => handleRemoveIngredient(ingredient)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pantry;
