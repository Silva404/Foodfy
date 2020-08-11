const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
// 
const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')

const { isAdmin, onlyUsers, isLoggedRedirectToList } = require('../app/middlewares/session')

routes.get('/login', isLoggedRedirectToList,SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)


routes.get('/profile', onlyUsers, UserController.profile)
routes.get('/create', isAdmin, UserController.create)
routes.get('/:id', isAdmin, UserController.show)

routes.get('/', isAdmin, UserController.list)
routes.post('/', isAdmin, UserValidator.post, UserController.post)
// routes.put('/', isAdmin, UserController.put)
// routes.delete('/', isAdmin, UserController.delete)

module.exports = routes