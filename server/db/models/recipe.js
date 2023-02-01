const sequelize = require("sequelize");
const db = require("../db");

const recipe = db.define("recipe", {
  recipe_id(findByPk) {
    type: sequelize.INTEGER, primaryKey;
    true, autoIncrement;
    true, allowNull;
    false;
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  isBookmarked: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
  isCooked: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
  // },  wrote these additional fields in the model, if we decide to use them.
  //  recipeDescription: {
  //     type: sequelize.STRING,
  //     allowNull: false
  // },
  // recipeImage: {
  //     type: sequelize.STRING,
  //     allowNull: false
  // },
  // recipeInstructions: {
  //     type: sequelize.STRING,
  //     allowNull: false
  // },
  // recipeIngredients: {
  //     type: sequelize.STRING,
  //     allowNull: false
  // },
  // recipeTags: {
  //     type: sequelize.STRING,
  //     allowNull: false
  // },
  // recipeRating: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
  // recipeServings: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
  // recipePrepTime: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
  // recipeCookTime: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
  // recipeTotalTime: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
  // recipeCalories: {
  //     type: sequelize.INTEGER,
  //     allowNull: false
  // },
});

module.exports = recipe;
