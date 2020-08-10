module.exports = {
  loginForm(req, res) {
    return res.render('session/loginForm')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/profile')
  },
  forgotForm(req, res){
    return res.render('session/resetForm')
  },
  resetForm(req, res) {
    return res.render('session/resetForm')
  },
  reset(req, res) {    
    return res.render('session/loginForm')
  }
} 