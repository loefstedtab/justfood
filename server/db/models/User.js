const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});



module.exports = User;

// User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
