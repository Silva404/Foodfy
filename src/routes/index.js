const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const site = require('../app/controllers/site')

const recipes = require('./recipes')
const chefs = require('./chefs')

routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)

//site
routes.get("/", site.index)
routes.get("/home", site.home)
routes.get("/recipes", site.recipes)
routes.get("/recipes/:id", site.recipe)



module.exports = routes