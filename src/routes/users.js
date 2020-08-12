const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
// 
const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')

const { isAdmin, onlyUsers, isLoggedRedirectToList } = require('../app/middlewares/session')

routes.get('/login', isLoggedRedirectToList, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

routes.get('/profile', onlyUsers, UserController.profile)
routes.get('/create', onlyUsers, isAdmin, UserController.create)
routes.get('/:id', onlyUsers, isAdmin, UserController.show)
routes.get('/', onlyUsers, isAdmin, UserController.list)
routes.post('/', onlyUsers, isAdmin, UserValidator.post, UserController.post)
routes.put('/', onlyUsers, UserController.put)
routes.delete('/', onlyUsers, isAdmin, UserController.delete)

module.exports = routes