const Site = require('../models/Site')

module.exports = {
    index(req, res) {
        return res.redirect("/home")
    },
    home(req, res)  {
        Site.all(recipes => {
            return res.render("site/index", { recipes })
        })
    },
    recipes(req, res)  {
        Site.all(recipes => {
            return res.render("site/recipes", { recipes })
        })
    },
    recipe(req, res) {
       Site.find(req.params.id, recipe => {        
        if (!recipe) return res.send("Recipe not found!")
    
        return res.render("site/recipe", { recipes: recipe })
       })
    }
}