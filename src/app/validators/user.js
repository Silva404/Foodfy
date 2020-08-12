const User = require('../models/User')
const { compare } = require('bcryptjs')

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

  if (user) {
    return res.render('admin/users/register', {
      erro: "Usuário cadastrado com sucesso!"
    })
  }

  next()
}

async function put(req, res, next) {
  const fillAllTheFields = checkAllFields(req.body)

  if (fillAllTheFields) {
    return res.render('admin/users/register', fillAllTheFields)
  }

  const { id, password } = req.body

  if (!password) return res.render('admin/users/user', {
    user: req.body,
    erro: "Coloque sua senha para atualizar seu cadastro!"
  })

  const user = User.findOne({
    where: id
  })

  const passed = await compare(password, user.password)

  if (!passed) return res.render('admin/users/user', {
    user: req.body,
    erro: "Senha incorreta!"
  })


  next()
}

module.exports = {
  post,
  put
}