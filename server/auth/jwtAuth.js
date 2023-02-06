const { User } = require("../db");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Protect routes function
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from user
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      req.user = await User.findByPk(decoded);
      console.log('USER FROM PROTECT controller', req.user)
      //.select('-password');
      next();
    } catch (err) {
      res.status(401).json("Not authorized");
    }
  }
  if (!token) {
    res.status(401).json("Not authorized");
  }
};

//register new user
const registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  try {
    //validation
    if (!email || !password) {
      res.status(400).json("Please include all fields");
    }

    //Find if user exists
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      res.status(400).json("User already exists");
    }

    //Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json("Invalid user data");
    }
  } catch (err) {
    next(err);
  }
};

//Login a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  try {
    //check user passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (err) {
    next(err);
  }
};

//Get current user
const getMe = async (req, res, next) => {
  try {
    const user = req.user
    //const user = await User.findByToken(req.headers.authorization)
    // const user = {
    //   id: req.user.id,
    //   firstName: req.user.firstName,
    //   lastName: req.user.lastName,
    //   email: req.user.email,
    //   phoneNumber: req.user.phoneNumber,
    // };
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async(req,res,next) => {
  try{
    const user = await User.findByPk(req.body.id);

   // const user = req.user;
    // const user = {
    //   id: req.user.id,
    //   firstName: req.user.firstName,
    //   lastName: req.user.lastName,
    //   email: req.user.email,
    //   phoneNumber: req.user.phoneNumber,
    // }
    //const user = await User.findByToken(req.headers.authorization)
    console.log('USER FROM ENDPOINT', user)
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  }catch(err){
    next(err);
  }
};

const generateToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    //expiresIn: '30d',
  });
};

const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

 //User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  generateToken,
  protect,
};
