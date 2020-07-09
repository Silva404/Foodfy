const Chefs = require('../models/Chefs')

module.exports = {
    index(req, res) {
        Chefs.all(chefs => {
            return res.render('chefs/chefs', { chefs })
        })
    },
    create(req, res) {
        return res.render('chefs/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chefs.create(req.body, chef => {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },
    show(req, res) {
        Chefs.findChef(req.params.id, (chef, recipes, totalRecipes) => {
            if (!chef) return res.send('Chef not found!')

            return res.render('chefs/chef', { chef, recipes, totalRecipes })
        })
    }
}