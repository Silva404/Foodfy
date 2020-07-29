const Recipes = require('../models/Recipes')
const File = require('../models/File')

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
        try {
            let results = await Recipes.allChefs()
            const chefs = results.rows

            return res.render('./admin/recipes/create', { chefs })
        } catch (err) {
            console.log(err)
        }
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == '') return res.send('Please, fill and the fields.')
            }

            let results = await Recipes.create(req.body)
            const recipeId = results.rows[0].id

            const filePromises = req.files.map(file => File.createRecipeFiles({ ...file, recipe_id: recipeId }))
            await Promise.all(filePromises)            
 
            res.redirect(`admin/recipes/${recipeId}`)
        } catch (err) {
            console.log(`ERRO => ${err}`)
        }
    },
    async show(req, res) {
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]
        const chef = results.rows

        if (!recipe) {
            res.send('Recipe not found.')
        }

        return res.render('admin/recipes/recipe', { recipe, chef })

    },
    async edit(req, res) {
        let results = await Recipes.find(req.params.id)
        const recipes = results.rows[0]
        const chefs = results.rows

        if (!recipes) {
            res.send('Recipe not found.')
        }

        return res.render('admin/recipes/edit', { recipes, chefs })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },
    async delete(req, res) {
        await Recipes.delete(req.body.id)

        return res.redirect('/admin/recipes')
    }
}