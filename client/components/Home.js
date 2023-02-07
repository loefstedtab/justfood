import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restrictions, setRestrictions] = useState({
    dairyFree: false,
    soyFree: false,
    lowSodium: false,
  });
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [includePantryIngredients, setIncludePantryIngredients] =
    useState(false);
  const [missingIngredients, setMissingIngredients] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);

  const handleSearchTermChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      setSuggestions([]);
      return;
    }
    const restrictionsQuery = Object.keys(restrictions)
      .filter((restriction) => restrictions[restriction])
      .map((restriction) => restriction + "=true")
      .join("&");
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${e.target.value}&${restrictionsQuery}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
    );
    setSuggestions(res.data.results.slice(0, 5));
  };

  const handleRestrictionChange = (restriction) => {
    setRestrictions({
      ...restrictions,
      [restriction]: !restrictions[restriction],
    });
  };

  const handleIngredientSearchTermChange = async (e) => {
    setIngredientSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      setIngredientSuggestions([]);
      return;
    }
    const res = await axios.get(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${e.target.value}&number=5&apiKey=67f2eb38dc7441189476c0fd3fb74863`
    );
    setIngredientSuggestions(res.data);
  };

  const handleIngredientAdd = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleIncludePantryIngredientsChange = () => {
    setIncludePantryIngredients(!includePantryIngredients);
  };

  const handleMissingIngredientsChange = (e) => {
    setMissingIngredients(e.target.value);
  };

  const handleIngredientRemove = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const restrictionsQuery = Object.keys(restrictions)
      .filter((restriction) => restrictions[restriction])
      .map((restriction) => restriction + "=true")
      .join("&");
    let res;
    if (ingredients.length === 0 || missingIngredients === 0) {
      res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&${restrictionsQuery}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
      );
    } else {
      const ingredientsQuery = ingredients
        .map((ingredient) => `ingredients=${ingredient}`)
        .join("&");
      res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&${ingredientsQuery}&numberOfMissingIngredients=${missingIngredients}&${restrictionsQuery}&apiKey=67f2eb38dc7441189476c0fd3fb74863`
      );
    }
    console.log(res.data.results);
    // do something with the results, e.g. display them on the page
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
        <div>
          <label>
            <input
              type="checkbox"
              checked={restrictions.dairyFree}
              onChange={() => handleRestrictionChange("dairyFree")}
            />
            Dairy-Free
          </label>
          <label>
            <input
              type="checkbox"
              checked={restrictions.soyFree}
              onChange={() => handleRestrictionChange("soyFree")}
            />
            Soy-Free
          </label>
          <label>
            <input
              type="checkbox"
              checked={restrictions.lowSodium}
              onChange={() => handleRestrictionChange("lowSodium")}
            />
            Low Sodium
          </label>
          <label>
            <input
              type="checkbox"
              checked={restrictions.Canadian}
              onChange={() => handleRestrictionChange("Canadian")}
            />
            Canadian
          </label>
        </div>
        <input
          type="text"
          value={ingredientSearchTerm}
          onChange={handleIngredientSearchTermChange}
          placeholder="Search for an ingredient"
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                {suggestion.title}
                <button
                  type="button"
                  onClick={() => handleIngredientAdd(suggestion.title)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
        {ingredientSuggestions.length > 0 && (
          <ul>
            {ingredientSuggestions.map((suggestion) => (
              <li key={suggestion.id}>
                {suggestion.name}
                <button
                  type="button"
                  onClick={() => handleIngredientAdd(suggestion.name)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}{" "}
              <button onClick={() => handleIngredientRemove(ingredient)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <label>
          <input
            type="checkbox"
            checked={includePantryIngredients}
            onChange={handleIncludePantryIngredientsChange}
          />
          Include pantry ingredients
        </label>
        {includePantryIngredients && (
          <input>
            type="number" value={missingIngredients}
            onChange={handleMissingIngredientsChange}
            placeholder="Number of missing ingredients"
          </input>
        )}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
