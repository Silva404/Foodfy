const User = require("../models/User")
const { compare } = require("bcryptjs")

async function login(req, res, next) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.render('session/loginForm', {
        user: req.body,
        erro: "Usuário não cadastrado"
      })
    }

    const passed = await compare(password, user.password)

    if (!passed) {
      return res.render('session/loginForm', {
        user: user,
        erro: "Senha inválida"
      })
    }

    req.user = user
    console.log(req.user);

    next()
  } catch (err) {
    console.error(err)
  }
}

async function forgot(req, res, next) {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.render("session/forgotForm", {
      user: req.body,
      erro: "Usuário não encontrado!"
    })

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

async function reset(req, res, next) {
  const { email, password, token, passwordRepeat } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.render("session/resetForm", {
      user: req.body,
      erro: "Usuário não encontrado!"
    })

    if (password != passwordRepeat) return res.render("session/resetForm", {
      user: req.body,
      alert: "Senhas inválidas."
    })

    if (token != user.reset_token) return res.render("session/resetForm", { 
      user: req.body,
      erro: 'Chave inválida, solicite uma nova recuperação de senha'
    })

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  login,
  forgot,
  reset
}