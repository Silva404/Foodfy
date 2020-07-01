// const data = require('../public/scripts/data')
const data = require('../data.json')

exports.index = (requisition, response) => {
    return response.redirect("/home")
}

exports.home = (requisition, response) => {
    return response.render("clients/index", { recipes: data.recipes })
}

exports.recipes = (requisition, response) => {
    return response.render("clients/recipes", { recipes: data.recipes })
}

exports.recipe = (requisition, response) => {
    const id = requisition.params.index
    const recipe = data.recipes.find(recipe => recipe.id == id)
    if (!recipe) return response.send("Recipe not found!")

    return response.render("clients/recipe", { recipes: recipe })
}