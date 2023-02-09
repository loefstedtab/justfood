import React, {useState, useEffect} from 'react';

const Bookmarked = () => {
  const [bookmarkedMeals, setBookmarkedMeals] = useState([]);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem("bookmarkedMeals")) || [];
    setBookmarkedMeals(storedMeals);
  }, []);

  return (
    <div>
      <h1>Bookmarked Meals</h1>
      {bookmarkedMeals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.title}</h2>
          <img src={meal.image} alt={meal.title} />
        </div>
      ))}
    </div>
  );
};

export default Bookmarked;