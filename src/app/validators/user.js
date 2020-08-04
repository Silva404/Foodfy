const User = require('../models/User')

async function post(req, res, next){
  const keys = Object.keys(req.body)

  for (let key of keys) {
    if (req.body[key] == '') return res.render('/', { 
      user: req.body,
      alert: "Por favor, preencha todos os campos"
    })
  }

  let { email, cpf_cnpj, password, passwordRepeat } = req.body
  cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  })

  if (user) return res.render('/', { 
    user: req.body,
    error: "Usuário já cadastrado"
  })

  if (password != passwordRepeat) return res.render('/', { 
    user: req.body,
    alert: "Os campos de senha não coincidem"
  })

  next()
}

module.exports = {
  post
}