const express = require('express')
const routes = express.Router()

// const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

// const SessionValidator = require('../app/validators/user')
const UserValidator = require('../app/validators/user')



// login/logout
// routes.get('/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.logout)


// // reset password
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/forgot-password', SessionController.forgot)
// routes.post('/password-reset', SessionController.reset)





// Rotas de perfil de um usuário logado
// routes.get('/profile', UserController.index) // Mostrar o formulário com dados do usuário logado
routes.get('/create', UserController.create)
// routes.put('/profile', UserController.put)// Editar o usuário logado


// Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/', UserController.list) //Mostrar a lista de usuários cadastrados
routes.post('/', UserValidator.post, UserController.post)//Cadastrar um usuário
// routes.put('/', UserController.put) // Editar um usuário
// routes.delete('/', UserController.delete) // Deletar um usuário

module.exports = routes