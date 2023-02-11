//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Cooked = require("./models/Cooked");
// const Ingredient = require("./models/Ingredient");
const Pantry = require("./models/Pantry");
const Recipe = require("./models/Recipe");

//associations could go here!
User.hasMany(Recipe)
Recipe.belongsTo(User)

module.exports = {
  db,
  User,
  Cooked,
  // Ingredient,
  Pantry,
  Recipe
};
