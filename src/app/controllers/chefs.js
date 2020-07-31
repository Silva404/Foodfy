const Chefs = require('../models/Chefs')
const File = require('../models/File')
const { files } = require('../models/Chefs')

module.exports = {
    async index(req, res) {
        // let { filter, page, limit } = req.query

        // page = page || 1
        // limit = limit || 6
        // let offset = limit * (page - 1)

        // const params = {
        //     filter,
        //     page,
        //     limit,
        //     offset,
        //     callback(chefs) {
        //         const pagination = {
        //             total: Math.ceil(chefs[0].total / limit),
        //             page
        //         }

        //         return res.render('admin/chefs/chefs', { chefs, filter, pagination })
        //     }
        // }

        // Chefs.paginate(params)
        try {
            let results = Chefs.all()
            const chefs = results.rows

            async function getImage(chefId) {
                let results = chefs.chefFiles(chefId)
                const files = results.map(chef => {
                    `${req.protocol}://${req.headers.host}${chef.path.replace("public", "")}`

                    return chef[0]
                })
            }

            // const chefPromises = chefs.map(async chef => {
            //     chef.image = await getImage(chef.id)

            //     return chef
            // })

            // const chefImage = await Promise.all(chefPromises)

            // , { chefs: chefImage}
            return res.render('admin/chefs/chefs')
        } catch (err) {
            console.log(err)
        }
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

            console.log(chef);

            results = await Chefs.files(chef.file_id)
            let avatar = results.rows
            avatar = avatar.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render('admin/chefs/edit', { chef, recipes, avatar })
        } catch (err) {
            console.log(err)
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == '' && key != "removed_files") {
                    return res.send('Please fill all the fields')
                }
            }
            
            if (req.files.length != 0 ){
                const filePromise = req.files.map(file => File.create(file))

                const results = await filePromise[0]
                const fileId = results.rows[0].id
                await Chefs.updateFile(req.body, fileId)
            } else {
                await Chefs.update(req.body) 
            }

            if (req.removed_files) {
                const removedFiles = req.body.removed_files.split(',')
                const lastIndex = removedFiles.length - 1
                removedFiles.splice(lastIndex, 1)

                const filePromises = removedFiles.map(id => File.chefFileDelete(id))

                await Promise.all(filePromises)
            }


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