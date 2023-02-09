import React, { useState } from "react";

const CheckboxFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="checkbox-filter">
      {filters.map((filter) => (
        <label key={filter}>
          <input
            type="checkbox"
            value={filter}
            onChange={handleFilterChange}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};

const Restrictions = ({filters, setFilters}) => {
  
  console.log(filters);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    if (filters.includes(newFilter)) {
      setFilters(filters.filter((f) => f !== newFilter));
    } else {
      setFilters([...filters, newFilter]);
    }
  };

  return (
    <div className="restrictions">
      <CheckboxFilter
        filters={["High Protein", "Vegan", "Low Fat", "Low Carb", "Low Sodium", "Gluten Free", "Dairy Free","Paleo", "Whole30","vegetarian","" ]}
        handleFilterChange={handleFilterChange}
      />
    
    </div>
  );
};

export default Restrictions;