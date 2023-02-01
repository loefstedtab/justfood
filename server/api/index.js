const router = require("express").Router();
const { protect, isAuth } = require("../auth/auth");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const {
  generateToken,
  loginUser,
  registerUser,
  getMe,
} = require("../db/models/User");

//JWT routes
router.get("/jwtUser", protect, async (req, res, next) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/jwtLogin", loginUser);

router.post("/createNewUser", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const token = generateToken(user.dataValues.id);
  res.json(token);
});

//Google Routes
router.get("/googleUser", isAuth, async (req, res, next) => {
  try {
    const user = {
      ...req.user,
      loggedIn: true,
    };
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
