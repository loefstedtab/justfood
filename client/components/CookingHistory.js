import React, { useState, useEffect } from 'react';

const CookingHistory = () => {
  const [cookingHistory, setCookingHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("cookingHistory")) || [];
    setCookingHistory(storedHistory);
  }, []);

  return (
    <div>
      <h1>Cooking History</h1>
      {cookingHistory.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <img src={item.image} alt={item.title} />
          <p>{item.readyInMinutes} minutes</p>
        </div>
      ))}
    </div>
  );
};

export default CookingHistory;