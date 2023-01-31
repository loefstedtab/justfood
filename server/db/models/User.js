const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require('jsonwebtoken')
const bcrypt = require('js');

// const SALT_ROUNDS = 5;

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
  phoneNumber: {
    type: Sequelize.INTEGER,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
});

//register new user
const registerUser = async(req,res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  //validation
  if(!email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //Find if user exists
  const userExists = await User.findOne({ email });
  if(userExists){
    res.status(400);
    throw new Error('User already exists');
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

  if(user){
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user.id),
    });
  }else{
    res.status(400);
    throw new Error ('Invalid user data');
  }
};
  //Login a new user
  const loginUser = async(req,res) => {
    const { email, password } = req.body;
    const user = await user.findOne({ email });

    //check user passwords match
    if(user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user.id),
      });
    } else{
      res.status(401);
      throw new Error('Invalid credentials');
    }
  };

  //Get current user
  const getMe = async(req,res) => {
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    };
    res.status(200).json(user);
  };

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


module.exports = {
  User,
  registerUser,
  loginUser,
  getMe,
};
/**
 * instanceMethods
 */
// User.prototype.correctPassword = function(candidatePwd) {
//   //we need to compare the plain version to an encrypted version of the password
//   return bcrypt.compare(candidatePwd, this.password);
// }

// User.prototype.generateToken = function() {
//   return jwt.sign({id: this.id}, process.env.JWT)
// }

// /**
//  * classMethods
//  */
// User.authenticate = async function({ username, password }){
//     const user = await this.findOne({where: { username }})
//     if (!user || !(await user.correctPassword(password))) {
//       const error = Error('Incorrect username/password');
//       error.status = 401;
//       throw error;
//     }
//     return user.generateToken();
// };

// User.findByToken = async function(token) {
//   try {
//     const {id} = await jwt.verify(token, process.env.JWT)
//     const user = User.findByPk(id)
//     if (!user) {
//       throw 'nooo'
//     }
//     return user
//   } catch (ex) {
//     const error = Error('bad token')
//     error.status = 401
//     throw error
//   }
// }

// /**
//  * hooks
//  */
// const hashPassword = async(user) => {
//   //in case the password has been changed, we want to encrypt it with bcrypt
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
//   }
// }

// User.beforeCreate(hashPassword)
// User.beforeUpdate(hashPassword)
// User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
