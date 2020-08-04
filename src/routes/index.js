const express = require('express')
const routes = express.Router()

const recipes = require('./recipes')
const chefs = require('./chefs')
const site = require('./site')

routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)
routes.use(site)


module.exports = routes