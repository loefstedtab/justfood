const router = require("express").Router();
const { protect, updateUser } = require("../auth/jwtAuth");
const { isAuth } = require("../auth/googleAuth");
const jwt = require("jsonwebtoken");
const { User, Recipe } = require("../db");
const { registerUser, getMe, updateRecipe } = require("../auth/jwtAuth");
const { data } = require("jquery");

//JWT routes
router.route("/jwtUser")
.get(protect, getMe)
.put(protect, updateUser);

router.post("/jwtRegister", registerUser);

//Google Routes
router.get("/googleUser", isAuth, async (req, res, next) => {
  try {
    let {dataValues} = await User.findOne({where:{googleId: req.user.googleId}, include: Recipe})
    let user = {
      ...dataValues,
      loggedIn: true,
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Update the recipe
router.put("/updateRecipe", updateRecipe)

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;



