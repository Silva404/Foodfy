const Recipes = require('../models/Recipes')

module.exports = {
    index(req, res) {
        return res.redirect("/home")
    },
    async home(req, res) {
        try {
            const recipes = await Recipes.all()

            if (!recipes) return res.send("Recipe not found")

            async function getImage(recipeId) {
                let results = await Recipes.recipeFiles(recipeId)
                results = results.map(recipe => `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`)

                return results[0]
            }

            const recipesPromise = recipes.map(async recipe => {
                recipe.image = await getImage(recipe.id)

                return recipe
            })           

            const eachRecipeFixed = await Promise.all(recipesPromise)
            console.log(eachRecipeFixed);

            return res.render("site/index", { recipes: eachRecipeFixed })
        } catch (err) {
            console.log(err)
        }

        // Site.all((recipes) => {

        //     return res.render("site/index", { recipes })
        // })
    },
    async recipes(req, res) {
        try {
            let { filter, page, limit } = req.query
    
            page = page || 1
            limit = limit || 6
            let offset = limit * (page - 1)
    
            const params = { filter, page, limit, offset }

            let recipes = await Recipes.paginate(params)

            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            }

            if (!recipes) return res.send("Recipe not found")

            async function getImage(recipeId) {
                let results = await Recipes.recipeFiles(recipeId)
                results = results.map(recipe => `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`)

                return results[0]
            }

            const recipesPromise = recipes.map(async recipe => {
                recipe.image = await getImage(recipe.id)

                return recipe
            })

            const eachRecipeFixed = await Promise.all(recipesPromise)

            return res.render('site/recipes', { recipes: eachRecipeFixed, filter, pagination })
        } catch (err) {
            console.log(err)
        }      
    },
    async recipe(req, res) {
        try {
            let results = await Recipes.find(req.params.id)

            const recipe = results[0]
            const chef = results

            if (!recipe) {
                res.send('Recipe not found.')
            }

            results = await Recipes.files(recipe.recipe_id)
            results = results.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }))

            return res.render('site/recipe', { recipe, chef, files: results })

        } catch (err) {
            console.log(err)
        }
    }
}