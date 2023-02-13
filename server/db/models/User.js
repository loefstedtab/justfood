const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: " ",
  },
  phoneNumber: {
    type: Sequelize.STRING,
    defaultValue: " ",
  },
});

module.exports = User;
