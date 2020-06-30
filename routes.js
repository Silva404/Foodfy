const express = require('express')
const routes = express.Router()
const clients = require('./controllers/clients')
const recipes = require('./controllers/admin')

// general
routes.get("/", clients.index)
routes.get("/home", clients.home)
routes.get("/recipes", clients.recipes)
routes.get("/recipes/:index", clients.recipe)


//admin
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes