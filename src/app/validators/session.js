const User = require("../models/User")
const { compare } = require("bcryptjs")

async function login(req, res, next) {
  const { email, password } = req.body
  console.log(password);

  try {
    const user = await User.findOne({ where: { email } })
    console.log(user);
    if (!user) {
      return res.render('session/loginForm', {
        user: req.body,
        erro: "Usuário não cadastrado"
      })
    }

    if (user.password == password) {
      console.log('TRUEEEE');
    }
    const passed = await compare(password, user.password)
    console.log(passed);
    
    if (!passed) {
      return res.render('session/loginForm', {
        user: user,
        erro: "Senha inválida"
      })
    }

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  login
}