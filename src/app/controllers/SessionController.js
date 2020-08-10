const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

module.exports = {
  loginForm(req, res) {
    return res.render('session/loginForm')
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/admin/users')
  },
  logout(req, res) {
    req.session.destroy()

    return res.redirect('/')
  },
  forgotForm(req, res) {
    return res.render('session/forgotForm')
  },
  async forgot(req, res) {
    const user = req.user
    console.log(`CONTROLERR: ${user}`);

    try {
      const token = crypto.randomBytes(20).toString('hex')

      let now = new Date
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      await mailer.sendMail({
        to: user.email,
        from: 'foodfy-admin@mail.com',
        subject: 'Recuperação de senha',
        html: `
        <h2>Recuperação de senha</h2>
        <p>Não se preocupe, aqui está um link para fazer a recuperação</p> 
        <p><a href="http://localhost:3000/admin/users/password-reset?token=${token}" target="_blank">
        RECUPERAR SENHA
        </a></p> `
      })

      return res.redirect('/admin/users/login')
    } catch (err) {
      console.error(err);
    }

    return
  },
  resetForm(req, res) {
    return res.render('session/resetForm', { token: req.query.token })
  },
  async reset(req, res) {
    const user = req.user
    const { password, token } = req.body

    try {
      const newPassword = await hash(password, 8)

      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: ''
      })

      return res.render('session/loginForm', {
        user: req.body,
        success: "Senha atualizada! Faça o seu login."
      })
    } catch (err) {
      console.error(err)
      return res.render('session/loginForm', {
        user: req.body,
        token,
        erro: "Erro inesperado, tente novamente."
      })
    }
  }
} 