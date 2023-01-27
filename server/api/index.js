const router = require('express').Router()
module.exports = router
const isAuth = require('../isAuth')

router.use('/user', require('./user'))


router.get('/home', isAuth, async (req, res, next) => {
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

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
