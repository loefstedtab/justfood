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
      console.log(decoded, "DECODED");
      //get user from token
      req.user = await User.findByPk(decoded);
      console.log(req.user, "REQ USER");
      //.select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
};

//register new user
const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  //validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Find if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash
  const hashedPassword = bcrypt.hash(password, 10);

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
    res.status(400);
    throw new Error("Invalid user data");
  }
};

//Login a new user
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
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};

//Get current user
const getMe = async (req, res, next) => {
  try {
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    };
    res.status(200).json(user);
  } catch (err) {
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

User.beforeCreate(hashPassword);
// User.beforeUpdate(hashPassword)

module.exports = {
  registerUser,
  loginUser,
  getMe,
  generateToken,
  protect,
};