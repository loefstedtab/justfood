const sequelize = require("sequelize");
const { model } = require("../db");
const db = require("../db");

const isCooked = db.define("isCooked", {
  id(findByPk) {
    type: sequelize.INTEGER, primaryKey;
    true, autoIncrement;
    true, allowNull;
    false;
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  recipe_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  isCooked: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = isCooked;
