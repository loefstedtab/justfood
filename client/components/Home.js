import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pantry from "./Pantry";
import Filter from "./filters";
import CheckboxFilter from "./checkboxes";
import HomeDropdown from "./HomeDropdown";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState("Choose a Search Option:");
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();

  const handleSearchTermChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      setSuggestions([]);
      return;
    }

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${e.target.value}&apiKey=7d1e2814f507478498ff350fa1678752`
    );
    setSuggestions(res.data.results.slice(0, 5));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selected == "Search Directly for a Meal!") {
      navigate(
        `/allrecipes?searchTerm=${searchTerm}&filters=${filters.join(",")}`
      );
    } else {
      navigate(
        `/allrecipes?ingredients=${ingredients
          .map((ingredient) => ingredient.name)
          .join(",")}&filters=${filters.join(",")}`
      );
    }
  };

  return (
    <div>
    <div>
    <CheckboxFilter filters={filters} setFilters={setFilters} />
    </div>
    <div>
      <HomeDropdown selected={selected} setSelected={setSelected} />

      <div className="searchMealInput">
        {selected == "Search Directly for a Meal!" && (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search Directly for a Meal!"
            />
            <button type="submit">Search</button>
          </form>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="mealResultContainer">
          {suggestions.map((suggestion) => (
            <li>
              {" "}
              <a
                className="mealResults"
                href={`/recipe?recipeId=${suggestion.id}`}
                key={suggestion.id}
              >
                {suggestion.title}{" "}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="searchIngredientInput">
        {selected == "Search for a Meal by Ingredients!" && (
          <Pantry
            ingredients={ingredients}
            setIngredients={setIngredients}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
