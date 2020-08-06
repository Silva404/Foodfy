const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const Validator = require('../app/validators/user')



// Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.post('/admin/users', Validator.post, UserController.post) //Cadastrar um usuário
// routes.put('/admin/users', UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes