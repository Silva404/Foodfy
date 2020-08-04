const express = require('express')
const routes = express.Router()

const site = require('../app/controllers/SiteControllers')

routes.get("/", site.index)
routes.get("/home", site.home)
routes.get("/recipes", site.recipes)
routes.get("/recipes/:id", site.recipe)

module.exports = routes