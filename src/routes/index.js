const express = require('express')
const routes = express.Router()

const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')

const HomeController = require('../app/controllers/HomeControllers')

routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)
routes.use('/admin/users', users)

routes.get("/", HomeController.index)
routes.get("/home", HomeController.home)
routes.get("/recipes", HomeController.recipes)
routes.get("/recipes/:id", HomeController.recipe)

module.exports = routes