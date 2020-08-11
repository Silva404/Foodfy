function onlyUsers(req, res, next)  {
  if (!req.session.userId) return res.redirect('/admin/users/login')

  next()
}

function isLoggedRedirectToList(req, res, next) {
  if (req.session.userId) return res.redirect('/admin/users/profile')

  next()
}

function isAdmin(req, res, next) {
  // if (!req.user.is_admin) return 

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToList,
  isAdmin
}