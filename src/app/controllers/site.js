const Site = require('../models/Site')
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
        let { filter } = req.query

        if (filter) {
            Site.filter(filter, recipes => {
                return res.render('site/recipes', { recipes, filter })                
            })
        }
         else {   
            Site.all(recipes => {
                return res.render("site/recipes", { recipes })

                
            })
        }        
    },
    recipe(req, res) {
        Site.find(req.params.id, recipes => {
            if (!recipes) return res.send("Recipe not found!")

            return res.render("site/recipe", { recipes })
        })
    }
}