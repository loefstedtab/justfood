const sequelize = require("sequelize");
const db = require("../db");

const Recipe = db.define("recipe", {
  isBookmarked: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
  isCooked: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
  mealId: {
    type: sequelize.INTEGER,
  },
});

module.exports = Recipe;
