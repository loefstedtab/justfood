const sequelize = require("sequelize");
const db = require("../db");

const Pantry = db.define("pantry", {
  Pantry_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  ingredients: {
    type: sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Pantry;
