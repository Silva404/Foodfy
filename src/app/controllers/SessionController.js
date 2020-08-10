module.exports = {
  loginForm(req, res) {
    return res.render('session/loginForm')
  },
  async login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/profile')
  }
} 