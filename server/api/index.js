const router = require("express").Router();
const { protect } = require("../auth/jwtAuth");
const { isAuth } = require("../auth/googleAuth");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { generateToken, registerUser, getMe } = require("../auth/jwtAuth");

//JWT routes
// router.get("/jwtUser", protect, async (req, res, next) => {
//   try {
//     const user = req.user;
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/jwtUser", protect, getMe);

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
