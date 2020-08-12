const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

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
    },
    async chefs(req, res) {
        try {
            let { filter, page, limit } = req.query
            page = page || 1
            limit = limit || 6
            let offset = limit * (page - 1)

            const params = { filter, page, limit, offset }

            const chefs = await Chefs.paginate(params)
            const pagination = {
                total: Math.ceil(chefs[0].total / limit),
                page
            }

            if (!chefs) return res.send("Chef not found")

            async function getImage(chefId) {
                let results = await Chefs.getChefAvatar(chefId)

                return results.path
            }

            const chefPromises = chefs.map(async chef => {
                chef.image = await getImage(chef.id)
                chef.image = `${req.protocol}://${req.headers.host}${chef.image.replace("public", "")}`

                return chef
            })
            const chefImage = await Promise.all(chefPromises)


            return res.render('site/chefs', { chefs: chefImage, filter, pagination })
        } catch (err) {
            console.log(err)
        }
    },
    async chef(req, res) {
        try {
            const chefId = req.params.id
            let chef = await Chefs.find(chefId)

            if (!chef) return res.send("Chef not found")

            const chefRecipes = await Chefs.findChefRecipes(chefId)
            const recipeExist = chefRecipes[0].id
            let recipes = ''

            if (recipeExist != null) {
                async function getImage(recipeId) {
                    let results = await Recipes.files(recipeId)
                    return results[0].path
                }

                const recipePromise = chefRecipes.map(async recipe => {
                    recipe.image = await getImage(recipe.id)
                    recipe.image = `${req.protocol}://${req.headers.host}${recipe.image.replace("public", "")}`

                    return recipe
                })

                recipes = await Promise.all(recipePromise)
            }

            let chefFile = await Chefs.getChefAvatar(chefId)
            chefFile.path = `${req.protocol}://${req.headers.host}${chefFile.path.replace("public", "")}`

            return res.render('site/chef', { chef, recipes, chefFile })
        } catch (err) {
            console.log(err)
        }
    }
}