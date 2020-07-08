const Admin = require('../models/Admin')

module.exports = {
    index(req, res) {
        Admin.all(recipes => {
            return res.render('admin/recipes', { recipes })
        })
    },
    create(req, res) {
        return res.render('./admin/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Admin.create(req.body, recipe => {
            res.redirect(`admin/recipe/${recipe.id}`)
        })
    },
    show(req, res) {
        if (!foundRecipe) {
            res.send('Recipe not found.')
        }

        return res.render('admin/recipe', { recipes: recipe })
    },
    edit(req, res) {
        const { id } = req.params
        const foundRecipe = data.recipes.find(recipe => recipe.id == id)
        if (!foundRecipe) {
            res.send('Recipe not found.')
        }

        const recipe = {
            ...foundRecipe,
        }

        return res.render('admin/edit', { recipes: recipe })
    },
    put(req, res) {
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

            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        const filteredRecipe = data.recipes.filter(recipe => recipe.id != id)

        data.recipes = filteredRecipe

        fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
            if (err) return res.send('Error while deleting recipe')

            return res.redirect('/admin/recipes')
        })
    }
}