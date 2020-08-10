const crypto = require('crypto')
const User = require('../models/User')

module.exports = {
  loginForm(req, res) {
    return res.render('session/loginForm')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/profile')
  },
  forgotForm(req, res) {
    return res.render('session/forgotForm')
  },
  forgot(req, res) {
    try {
      const token = crypto.randomBytes(20).toString('hex')
      
      let now = new Date
      now = now.setHours(now.getHours() + 1)

      await User.update()

    } catch (err) {
      console.error(err);
    }

    return
  },
  resetForm(req, res) {
    return res.render('session/resetForm')
  },
  reset(req, res) {
    return res.render('session/loginForm')
  }
} 