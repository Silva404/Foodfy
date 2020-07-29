const Chefs = require('../models/Chefs')
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
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        if (req.files.length == 0)
            return res.send('Por favor, envie pelo menos uma foto')        

        const filePromise = req.files.map(file => File.create({ ...file }))
        let results = await filePromise[0]
        const fileId = results.rows[0].id

        results = await Chefs.create(req.body, fileId)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async show(req, res) {
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        const recipes = results.rows
        const totalRecipes = results.rowCount

        return res.render('admin/chefs/chef', { chef, recipes, totalRecipes })

    },
    async edit(req, res) {
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        const recipes = results.rows

        return res.render('admin/chefs/edit', { chef, recipes })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '') {
                return res.send('Please fill all the fields')
            }
        }

        await Chefs.update(req.body)

        return res.redirect(`/admin/chefs`)
    },
    async delete(req, res) {    
        await Chefs.delete(req.params.id)

        if (chef.recipes_name) {
        } else {
            return res.redirect(`/admin/chefs`)
        }

    }   
} 