const Recipes = require('../models/Recipes')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = { 
            filter,
            page,
            limit,
            offset,
            callback(chefs) {
                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }
                
                return res.render('admin/chefs/chefs', { chefs, filter, pagination })
            }
        }

        Recipes.paginate(params)
        // Recipes.all(recipes => {
        //     return res.render('admin/recipes/recipes', { recipes })
        // })
    },
    create(req, res) {
        Recipes.allChefs( chefs => {
        return res.render('./admin/recipes/create', { chefs })            
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Recipes.create(req.body, recipe => {
            res.redirect(`admin/recipes/${recipe.id}`)
        })
    },
    show(req, res) {
        Recipes.find(req.params.id, (recipe, chef) => {
            if (!recipe) {
                res.send('Recipe not found.')
            }
    
            return res.render('admin/recipes/recipe', { recipe, chef })
        })
    },
    edit(req, res) {
        Recipes.find(req.params.id, (recipes, chefs) => { 
            if (!recipes) {
                res.send('Recipe not found.')
            }

            return res.render('admin/recipes/edit', {  recipes, chefs }) 
        })        
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Recipes.update(req.body, () => {
            return res.redirect(`/admin/recipes/${req.body.id}`) 
        })
    },
    delete(req, res) {
        Recipes.delete(req.body.id, () => {
           return res.redirect('/admin/recipes')
        })
    }
}