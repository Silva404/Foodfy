const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const chefs = require('../app/controllers/ChefsController')

const { isAdmin }
  = require('../app/middlewares/session')

routes.get("/", chefs.index)
routes.get("/create", isAdmin, chefs.create)
routes.get("/:id", chefs.show)
routes.get("/:id/edit", isAdmin, chefs.edit)

routes.post("/", multer.array("chef_photos", 1), chefs.post)
routes.put("/", multer.array("chef_photos", 1), chefs.put)
routes.delete("/", isAdmin, chefs.delete)

module.exports = routes