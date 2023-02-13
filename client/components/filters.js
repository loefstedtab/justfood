import React, { useState } from 'react';
import { configureStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import CheckboxFilter from './checkboxes';


const Filter = () => {
  const [missingIngredients, setMissingIngredients] = useState(0);
  const [maxCostPerServing, setMaxCostPerServing] = useState(0);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const handlemaxCostPerServing = (event) => {
    setMaxCostPerServing(event.target.value);
  };

  const handleFilterChange = (filter) => {
    dispatch({ type: 'TOGGLE_FILTER', filter });
  };

  const handleMissingIngredientChange = (event) => {
    setMissingIngredients(event.target.value);
  };


  return (
    <div className='FilterContainer2'>
      <div>
        {filters && filters.map((filter, index) => (
          <label key={index}>
            <input type="checkbox" name={filter.name} id={filter.id} onChange={() => handleFilterChange(filter.id)} />
            {filter.name}
          </label>
        ))}
      </div>

      <div className='ToggleFilters'>
        <label htmlFor="slider" >
          Missing Ingredients
          <input
            type="range"
            id="slider"
            min="0"
            max="5"
            value={missingIngredients}
            onChange={handleMissingIngredientChange}
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
      </div>
    </div>
  );
};

export default Filter;


