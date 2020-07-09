const Site = require('../models/Site')

module.exports = {
    index(req, res) {
        return res.redirect("/home")
    },
    home(req, res) {
        Site.all((recipes) => {

            return res.render("site/index", { recipes })
        })
    },
    recipes(req, res) {
        let { filter } = req.query

        if (filter) {
            Site.filter(filter, recipes => {
                return res.render('site/recipes', { recipes, filter })
            })
        } else {
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