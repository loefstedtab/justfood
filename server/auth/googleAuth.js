const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { User, Recipe } = require("../db");
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
      try {
        const userExists = await User.findOne({
          where: { googleId: user.sub },
        });
        console.log(userExists)
        let findOrCreate = async () => {
          if (userExists === null) {
            let newUser = await User.create({firstName: user.given_name, lastName: user.family_name, email: user.email, googleId: user.sub});
            return newUser
          } else {
            let user = await userExists.update({firstName: user.given_name, lastName: user.family_name, email: user.email});
            return user
          }
        }
        let googleUser = await findOrCreate()
        let {dataValues} = await User.findOne({where : {googleId: googleUser.dataValues.googleId}, include: Recipe})
        done(null, dataValues);
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

const isAuth = (req, res, next) => {
  if (req.user) next();
  else {
    res.json({ loggedIn: false });
  }
};

module.exports = { isAuth };

// user = await User.findOrCreate({
//   where: {
//     googleId: user.sub,
//   },
//   defaults: {
//     firstName: user.given_name,
//     lastName: user.family_name,
//     email: user.email,
//   },
//   include: [Recipe],
// });
