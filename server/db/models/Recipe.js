const { Sequelize } = require("sequelize");
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
  createdAt: {
    type: sequelize.DATEONLY,
  },
  updatedAt: {
    type: sequelize.DATEONLY,
  },
  title: {
    type: sequelize.STRING,
  },
  image: {
    type: sequelize.STRING,
  },
  servings: {
    type: sequelize.INTEGER,
  },
  readyInMinutes:{
    type: sequelize.INTEGER,
  },
  dairyFree:{
    type: sequelize.BOOLEAN,
  },
  glutenFree:{
    type: sequelize.BOOLEAN,
  },
  ketogenic:{
    type: sequelize.BOOLEAN,
  },
  sustainable:{
    type: sequelize.BOOLEAN,
  },
  vegan:{
    type: sequelize.BOOLEAN,
  },
  vegetarian:{
    type: sequelize.BOOLEAN,
  },
  veryHealthy:{
    type: sequelize.BOOLEAN,
  },
  veryPopular:{
    type: sequelize.BOOLEAN,
  },
  whole30:{
    type: sequelize.BOOLEAN,
  },
  summary:{
    type: sequelize.ARRAY(Sequelize.JSONB)
  },
  instructions:{
    type: sequelize.ARRAY(Sequelize.JSONB)
  },
  cuisines:{
    type: sequelize.ARRAY(Sequelize.JSONB)
  }
});

module.exports = Recipe;
