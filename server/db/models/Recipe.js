const sequelize = require("sequelize");
const db = require("../db");

const Recipe = db.define("recipe", {
  recipe_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: sequelize.INTEGER,
  },
  isBookmarked: {
    type: sequelize.BOOLEAN,
  },
  isCooked: {
    type: sequelize.BOOLEAN,
  },

  //  wrote these additional fields in the model, if we decide to use them.
  recipeDescription: {
    type: sequelize.STRING,
  },
  recipeImage: {
    type: sequelize.STRING,
  },
  recipeInstructions: {
    type: sequelize.STRING,
  },
  recipeIngredients: {
    type: sequelize.STRING,
  },
  recipeTags: {
    type: sequelize.STRING,
  },
  recipeRating: {
    type: sequelize.INTEGER,
  },
  recipeServings: {
    type: sequelize.INTEGER,
  },
  recipePrepTime: {
    type: sequelize.INTEGER,
  },
  recipeCookTime: {
    type: sequelize.INTEGER,
  },
  recipeTotalTime: {
    type: sequelize.INTEGER,
  },
  recipeCalories: {
    type: sequelize.INTEGER,
  },
});

module.exports = Recipe;
