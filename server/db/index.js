const Sequelize = require("sequelize");

const db = require("./db");
const User = require("./models/User");
const Cooked = require("./models/Cooked");
const Pantry = require("./models/Pantry");
const Recipe = require("./models/Recipe");

User.hasMany(Recipe);
Recipe.belongsTo(User);

module.exports = {
  db,
  User,
  Cooked,
  Pantry,
  Recipe,
};
