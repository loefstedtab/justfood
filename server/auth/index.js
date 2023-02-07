const router = require("express").Router();
const passport = require("passport");
const { loginUser } = require("./jwtAuth");

//Google Login Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: "profile email",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (_, res) => {
    res.redirect(`/home`);
  }
);

//JWT Login Auth Route
router.post("/jwtLogin", loginUser);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
