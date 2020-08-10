const User = require('../models/User')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (let key of keys) {
    if (body[key] == '') {
      return {
        user: body,
        alert: "Por favor, preencha todos os campos!"
      }
    }
  }
}

async function post(req, res, next) {
  const fillAllTheFields = checkAllFields(req.body)

  if (fillAllTheFields) {
    return res.render('admin/users/register', fillAllTheFields)
  }

  const { email } = req.body

  const user = User.findOne({
    where: email
  })

  next()
}


module.exports = {
  post
}