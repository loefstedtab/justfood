const router = require('express').Router();
const passport = require('passport')


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

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;


