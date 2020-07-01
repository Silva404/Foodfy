const fs = require('fs')
const data = require('../data.json')

exports.index = (req, res) => {
    return res.render('admin/recipes', { recipes: data.recipes })
}

exports.create = (req, res) => {
    return res.render('./admin/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') return res.send('Please, fill and the fields.')
    }

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]
    if (lastRecipe) {
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error while writing file.')

        return res.redirect('/admin/recipes')
    })
}

exports.show = (req, res) => {
    const { id } = req.params
    const foundRecipe = data.recipes.find(recipe => recipe.id == id)
    if (!foundRecipe) {
        res.send('Recipe not found.')
    }

    const recipe = {
        ...foundRecipe,
        // ingredients: foundRecipe.ingredients.split(','),
        preparation: foundRecipe.preparation.split(',')
    }

    return res.render('admin/recipe', { recipes: recipe })
}

exports.edit = (req, res) => {
    const { id } = req.params
    const foundRecipe = data.recipes.find(recipe => recipe.id == id)
    if (!foundRecipe) {
        res.send('Recipe not found.')
    }

    const recipe = {
        ...foundRecipe,
        // ingredients: foundRecipe.ingredients.split(','),
        preparation: foundRecipe.preparation.split(',')
    }

    return res.render('admin/edit', { recipes: recipe })
}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        if (recipe.id == id) {
            index = foundIndex
            return true
        }
    })
    if (!foundRecipe) {
        res.send('Recipe not found.')
    }

    const recipe = {
        id: Number(req.body.id),
        ...foundRecipe,
        ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error while writing file.')

        return res.redirect('/admin/recipes')
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredRecipe = data.recipes.filter(recipe => recipe.id != id)

    data.recipes = filteredRecipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error while deleting recipe')

        return res.redirect('/admin/recipes')
    })
}