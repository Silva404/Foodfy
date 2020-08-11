function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect('/admin/users/login')

  next()
}

function isLoggedRedirectToList(req, res, next) {
  if (req.session.userId) return res.redirect('/admin/users/profile')

  next()
}

function isAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    req.session.error = "Desculpe, somente administradores tem acesso a essa página."
 
    return res.redirect(`${req.headers.referer}`)
  }

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToList,
  isAdmin
}