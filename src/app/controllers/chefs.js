const Chefs = require('../models/Chefs')

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

        Chefs.paginate(params)
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
    put(req, res) {
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
    delete(req, res) {
        Chefs.delete(req.params.id, () => {
            if (chef.recipes_name) {
            } else {
                return res.redirect(`/admin/chefs`)
            }
        })
    }
}