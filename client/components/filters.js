import React, { useState } from 'react';

const Filter = () => {
  const [missingIngredients, setMissingIngredients] = useState(0);
  const [maxCostPerServing, setMaxCostPerServing] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    dairyFree: false,
    soyFree: false,
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    paleo: false,
    whole30: false,
    ketogenic: false,
  });

  const handlemaxCostPerServing = (event) => {
    setMaxCostPerServing(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setDietaryRestrictions({ ...dietaryRestrictions, [filter]: !dietaryRestrictions[filter] });
  };

  const handleSliderChange = (event) => {
    setMissingIngredients(event.target.value);
  };
  return (
    <div>
      <div>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('dairyFree')} />
          Dairy-Free
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('soyFree')} />
          Soy-Free
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('glutenFree')} />
          Gluten-Free
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('vegan')} />
          Vegan
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('vegetarian')} />
          Vegetarian
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('paleo')} />
          Paleo
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('whole30')} />
          Whole30
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('ketogenic')} />
          Ketogenic
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('lowFodmap')} />
          Low Fodmap
        </label>
        <label> 
          <input type="checkbox" onChange={() => handleFilterChange('lowCarb')} />
          Low Carb
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('lowFat')} />
          Low Fat
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('lowSugar')} />
          low Sugar
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('lowSodium')} />
          Low Sodium
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('HighProtein')} />
          High Protein
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('HighFiber')} />
          High Fiber
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('HighIron')} />
          High Iron
        </label>
        <label> 
          <input type="checkbox" onChange={() => handleFilterChange('HighCalcium')} />
          High Calcium
        </label>

      </div>
      <div>
        <label htmlFor="slider">
          Missing Ingredients
          <input 
            type="range" 
            id="slider" 
            min="0" 
            max="5" 
            value={missingIngredients} 
            onChange={handleSliderChange}
          />
        </label>
        <label>
          Max Cost Per Serving
          <input
            type="number"
            value={maxCostPerServing}
            onChange={handlemaxCostPerServing}
          />
        </label>
        <p>{missingIngredients}</p>
      </div>
    </div>
  );
};

export default Filter;