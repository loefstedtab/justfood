const { User, Recipe } = require("../db");
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
    const { dataValues } = await User.findByPk(req.user.dataValues.id, {
      include: Recipe,
    });
    res.json({ ...dataValues, loggedIn: true });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  if (req.body.password) {
    const { password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const foundUser = await User.findByPk(req.body.id);
      let user = {
        ...req.body,
        password: hashedPassword,
      };
      res.json(await foundUser.update(user));
    } catch (err) {
      next(err);
    }
  } else {
    let user = await User.findByPk(req.body.id);
    res.json(await user.update(req.body));
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    //Check to see if the recipe exists in the database
    const recipeExists = await Recipe.findOne({
      where: { mealId: req.body.mealId },
    });
    if (recipeExists === null) {
      res.json(await Recipe.create(req.body));
    } else {
      res.json(await recipeExists.update(req.body));
    }
  } catch (err) {
    next(err);
  }
};

const generateToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET);
};

Recipe.afterUpdate((recipe) => recipe.isBookmarked === false && !recipe.isCooked ? recipe.destroy() : null)

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  generateToken,
  protect,
  updateRecipe,
};
