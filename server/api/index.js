const router = require("express").Router();
const { protect, updateUser } = require("../auth/jwtAuth");
const { isAuth } = require("../auth/googleAuth");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { generateToken, registerUser, getMe } = require("../auth/jwtAuth");

//JWT routes
router.route("/jwtUser")
.get(protect, getMe)
.put(protect, updateUser);

router.post("/jwtRegister", registerUser);

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
