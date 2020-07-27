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
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }
                
                return res.render('admin/recipes/recipes', { recipes, filter, pagination })
            }
        }

        Recipes.paginate(params)
    },
    async create(req, res) {
        // Recipes.allChefs( chefs => {
        // return res.render('./admin/recipes/create', { chefs })            
        // })

        let results = await Recipes.allChefs()
        const chefs = results.rows

        return res.render('./admin/recipes/create', { chefs })  
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }
        
        let results = await Recipes.create(req.body) 
        const recipeId = results.rows[0].id

        res.redirect(`admin/recipes/${recipeId}`)
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