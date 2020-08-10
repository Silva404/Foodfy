const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {
  async list(req, res) {
    const users = await User.all()

    return res.render('admin/users/users', { users })
  },
  create(req, res) {
    return res.render('admin/users/register')
  },
  async show(req, res) {
    const user = await User.findUser(req.params.id)

    return res.render('admin/users/user', { user })
  },
  async post(req, res) {
    try {      
      const userId = await User.create(req.body)
      const user = await User.findUser(userId.id)


      await mailer.sendMail({
        to: user.email,
        from: 'foodfy-admin@mail.com',
        subject: 'Seja bem vindo ao Foodfy',
        html: `
        <h2>Seja bem-vindo!</h2>
        <p>Aqui está sua informação de acesso, seu email e senha gerados pelo sistema e são temporários, você pode alterá-los em seu perfil.</p> 
        <h5>Email:</h5>
        ${user.email}
        <h5>Senha:</h5>
        ${user.password}
        <p><a href="http://localhost:3000/admin/users/login" target="_blank">
        FAÇA JÁ SEU LOGIN
        </a></p>
        `
      })
    } catch (err) {
      console.error(err)
    }

    return res.redirect('/')
  },
  async put(req, res) {

  },
  async delete(req, res) {

  },
}