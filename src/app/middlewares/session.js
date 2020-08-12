const Recipes = require("../models/Recipes");

function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect('/admin/users/login')

  next()
}

function isLoggedRedirectToList(req, res, next) {
  if (req.session.userId) {
    if (req.session.isAdmin == true) {
      return res.redirect('/admin/users')
    } else {
      return res.redirect('/admin/users/profile')
    }
  }

  next()
}

function isAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    req.session.error = "Desculpe, somente administradores tem acesso a essa página."

    return res.redirect(`${req.headers.referer}`)
  }

  next()
}

async function isTheOwner(req, res, next) {
  const recipe = await Recipes.find(req.params.id)
    
  if (req.session.userId !== recipe[0].user_id)
    return res.redirect(`${req.headers.referer}`)
    console.log("passou"); 

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToList,
  isAdmin,
  isTheOwner
}