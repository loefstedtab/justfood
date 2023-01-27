const router = require('express').Router()
const { User } = require('../db')
const isAuth = require('../isAuth')


router.get('/account', isAuth, async (req, res, next) => {
  try {
    // const userInfo = await User.findAll()
    const user = {
      ...req.user,
      loggedIn: true
    }
    console.log("THIS IS MY USER API", user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})



module.exports = router
