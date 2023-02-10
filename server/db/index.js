const Sequelize = require("sequelize");


const db = require("./db");
const User = require("./models/User");
const Cooked = require("./models/Cooked");
const Ingredient = require("./models/Ingredient");
const Pantry = require("./models/Pantry");
const Recipe = require("./models/Recipe");



module.exports = {
  db,
  User,
  Cooked,
  Ingredient,
  Pantry,
  Recipe
};
