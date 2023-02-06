const router = require("express").Router();
const { protect, updateUser } = require("../auth/jwtAuth");
const { isAuth } = require("../auth/googleAuth");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { generateToken, registerUser, getMe } = require("../auth/jwtAuth");

//JWT routes
router.route('/jwtUser')
.get(protect, getMe)
//This route works
// router.put(`/jwtUser/:id`, async(req,res,next) => {
//   try{
//     const user = await User.findByPk(req.body.id);
//     console.log('USER FROM ENDPOINT', user);
//     const updatedUser = await user.update(req.body);
//     res.json(updatedUser);
//   }catch(err){
//     next(err)
//   }
// });

//This route works
// .put(async(req,res,next) => {
//   try{
//     const user = await User.findByPk(req.body.id);
//     console.log('USER FROM ENDPOINT', user);
//     const updatedUser = await user.update(req.body);
//     res.json(updatedUser);
//   }catch(err){
//     next(err)
//   }
// });

.put(protect, updateUser)
//.put(protect, getMe)
//   async (req, res, next) => {
//   try{
//     const user = await User.findByPk(req.body.id);
//     console.log('UPDATE USER FROM END POINT',user )
//     const updatedUser = await user.update(req.body)
//     console.log('SENT US', updatedUser.dataValues);
//     res.json(updatedUser)
//   } catch(err){
//     next(err)
//   }
// });
// .put(async (req, res, next) => {
//   try{
//     const user = await User.findByPk(req.params.id);
//     console.log('UPDATE USER FROM END POINT',user )
//     const updatedUser = await user.update(req.body)
//     console.log('SENT US', updatedUser.dataValues);
//     res.json(updatedUser)
//   } catch(err){
//     next(err)
//   }
//});
// router.put('/jwtUser/me', getMe, async(req,res,next) => {
//   const user = await User.findByToken(req.headers.authorization)
//   console.log('USER FROM ENDPOINT', user);
//   const updatedUser = user.update(req.body);
//   console.log('UPDATED USER FROM ENDPOINT', updatedUser)
//   res.json(updatedUser);

// })

router.post("/jwtRegister", registerUser)

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
