const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const db = require("../db");
const { User } = require("../db");
const sequelize = require("sequelize");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      let user = profile._json;
      console.log("THIS IS THE USER FROM GOOGLE", user);
      try {
        user = await User.findOrCreate({
          where: {
            googleId: user.sub,
          },
          defaults: {
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
          },
        });
        console.log(user);
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user);
});
