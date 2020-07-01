const data = require('../public/scripts/data')

exports.index = (requisition, response) => {
    return response.redirect("/home")
}

exports.home = (requisition, response) => {
    return response.render("clients/index", { recipes: data })
}

exports.recipes = (requisition, response) => {
    return response.render("clients/recipes", { recipes: data })
}

exports.recipe = (requisition, response) => {
    const id = requisition.params.index
    const recipe = data.find(recipe => recipe.id == id)
    if (!recipe) return response.send("Recipe not found!")

    return response.render("clients/recipe", { recipes: recipe })
}