"use strict";
const bcrypt = require("bcrypt");

const { db, User } = require("../server/db");
//const User = require('../server/db/models/User');
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  //Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "Phil",
      lastName: "McCraken",
      email: "phil@gmail.com",
      phoneNumber: "5055555555",
      password: await bcrypt.hash("phil", 10),
    }),
    User.create({
      firstName: "donny",
      lastName: "donowitz",
      email: "don@gmail.com",
      phoneNumber: "5055555555",
      password: await bcrypt.hash("don", 10),
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

module.exports = seed;
