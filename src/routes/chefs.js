const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const chefs = require('../app/controllers/ChefsController')

const { isAdmin, onlyUsers, isLoggedRedirectToList } 
= require('../app/middlewares/session')

routes.get("/", onlyUsers, chefs.index)
routes.get("/create", onlyUsers, isAdmin, chefs.create)
routes.get("/:id", onlyUsers, chefs.show)
routes.get("/:id/edit", onlyUsers, chefs.edit)

routes.post("/", onlyUsers, multer.array("chef_photos", 1), chefs.post)
routes.put("/", onlyUsers, multer.array("chef_photos", 1), chefs.put)
routes.delete("/", isAdmin, chefs.delete)

module.exports = routes