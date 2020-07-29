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
        try {
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
        } catch (err) {
            console.log(err)
        }
    },
    async show(req, res) {
        try {
            let results = await Chefs.find(req.params.id)
            const chef = results.rows[0]
            const recipes = results.rows
            const totalRecipes = results.rowCount

            results = await Chefs.files(chef.file_id)
            let avatar = results.rows   
            avatar = avatar.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            console.log(avatar)

            return res.render('admin/chefs/chef', { chef, recipes, totalRecipes, avatar })
        } catch (err) {
            console.log(err)
        }
    },
    async edit(req, res) {
        try {
            let results = await Chefs.find(req.params.id)
            const chef = results.rows[0]
            const recipes = results.rows

            return res.render('admin/chefs/edit', { chef, recipes })
        } catch (err) {
            console.log(err)
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == '') {
                    return res.send('Please fill all the fields')
                }
            }

            await Chefs.update(req.body)

            return res.redirect(`/admin/chefs`)
        } catch (err) {
            console.log(err)
        }
    },
    async delete(req, res) {
        try {
            await Chefs.delete(req.params.id)

            if (chef.recipes_name) {
            } else {
                return res.redirect(`/admin/chefs`)
            }
        } catch (err) {
            console.log(err)
        }
    }
} 