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
        Admin.find(req.params.id, recipe => {
            if (!recipe) {
                res.send('Recipe not found.')
            }
    
            return res.render('admin/recipe', { recipes: recipe })
        })
    },
    edit(req, res) {
        Admin.find(req.params.id, recipe => {
            if (!recipe) {
                res.send('Recipe not found.')
            }

    
            return res.render('admin/edit', { recipes: recipe })
        })        
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Admin.update(req.body, () => {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        Admin.delete(req.body.id, () => {
           return res.redirect('/admin/recipes')
        })
    }
}