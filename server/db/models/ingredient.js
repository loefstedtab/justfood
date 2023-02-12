const sequelize = require("sequelize");
const db = require("../db");
const Ingredient = db.define("ingredient", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = Ingredient;