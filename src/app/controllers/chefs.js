const Chefs = require('../models/Chefs')

module.exports = {
    index(req, res) {
        let { filter } = req.query 

        if (filter) {
            Chefs.filter(filter, chefs => {
                console.log(chefs)
                console.log(filter)
                return res.render ('admin/chefs/chefs', { chefs, filter})
            })
        } else {
            Chefs.all(chefs => {
                console.log(chefs)
                console.log(filter)
                return res.render('admin/chefs/chefs', { chefs })
            })
        }
    },
    create(req, res) {
        return res.render('admin/chefs/create')
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
        Chefs.find(req.params.id, (chef, recipes, totalRecipes) => {
            if (!chef) return res.send('Chef not fouund!')
            console.log(chef)
            console.log(recipes)
            console.log(totalRecipes)

            return res.render('admin/chefs/chef', { chef, recipes, totalRecipes })
        })
    },
    edit(req, res) {
        const { id } = req.body
 
        Chefs.find(req.params.id, (chef, recipes) => {
            if (!chef) return res.send('Chef not found!')

            return res.render('admin/chefs/edit', { chef, recipes }) 
        })
    },
    put (req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '') {
                return res.send('Please fill all the fields') 
            }
        }

        Chefs.update(req.body, () => {
            return res.redirect(`/admin/chefs`)
        })
    },
    delete (req, res) {        
        Chefs.delete(req.params.id, (chef) => {
            console.log(chef)
        if (chef.recipes_name) {
        } else {
            return res.redirect(`/admin/chefs`)
        }
        })
    }
}