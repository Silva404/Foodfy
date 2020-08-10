const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
// 
const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')



routes.get('/login', SessionController.loginForm)
routes.post('/login',  SessionValidator.login, SessionController.login)
// routes.post('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)



// routes.get('/profile', UserController.profile)
routes.get('/create', UserController.create)
routes.get('/:id', UserController.show)

routes.get('/', UserController.list) 
routes.post('/', UserValidator.post, UserController.post) 
// routes.put('/', UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes