const express = require('express')
const routes = express.Router()

// const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

// const SessionValidator = require('../app/validators/user')
const UserValidator = require('../app/validators/user')



// routes.get('/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.logout)

// routes.get('/forgot-password', SessionController.forgotForm)
// routes.post('/forgot-password', SessionController.forgot)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/password-reset', SessionController.reset)



// routes.get('/profile', UserController.profile)
routes.get('/create', UserController.create)
// routes.get('/:id', UserController.show)

// routes.get('/', UserController.list) 
routes.post('/', UserController.post) 
// routes.put('/', UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes