const router = require("express").Router();
const { protect, isAuth } = require('../auth/auth');
const jwt = require('jsonwebtoken');
const { User } = require("../db");

//JWT routes
router.get('/test',
protect,
async(req,res,next) => {
  try{
    res.json('TEST')

    //res.json(user);
  }catch(err){
    console.log(err)
  }
} ); 

const generateToken = ( id ) => {
  return jwt.sign( id, process.env.JWT_SECRET, {
    //expiresIn: '30d',
  });
};

router.post('/createNewUser',
async(req, res) => {
  const user = await User.findOne({where: {email:req.body.email}})
  const token = generateToken( user.dataValues.id )
  res.json(token);
});

//Google Routes
router.get("/googleUser",
isAuth,
async (req, res, next) => {
  try {
    const user = {
      ...req.user,
      loggedIn: true,
    };
    console.log("THIS IS MY USER API", user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
