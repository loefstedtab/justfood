const passport = require("passport");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { User } = require("../db");
const sequelize = require('sequelize');

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
        done(null, user[0]);
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

//Protect routes function
const protect = async(req,res,next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      //Get token from user
      token = req.headers.authorization.split(' ')[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, 'DECODED')
      //get user from token
      req.user = await User.findByPk(decoded)
      console.log(req.user, 'REQ USER');
      //.select('-password');
      next()
    }catch(err){
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if(!token){
    res.status(401);
    throw new Error('Not authorized');
  }
};
const isAuth = (req, res, next) => {
  if (req.user)
  next();
  else {
    res.json({ loggedIn: false });
  }
};

module.exports =  { protect, isAuth }
