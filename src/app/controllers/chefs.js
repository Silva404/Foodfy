const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')
const File = require('../models/File')

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

            let results = await Chefs.all()
            const chefs = results.rows

            if (!chefs) return res.send("Chef not found")

            async function getImage(chefId) {
                let results = await Chefs.chefFiles(chefId)
                const files = results.rows.map(chef => 
                    `${req.protocol}://${req.headers.host}${chef.path.replace("public", "")}`)
                return files[0]
            }

            const chefPromises = chefs.map(async chef => {
                chef.image = await getImage(chef.id)

                return chef
            })

            const chefImage = await Promise.all(chefPromises)

            return res.render('admin/chefs/chefs', { chefs: chefImage})
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
            const chefId = req.params.id 
            let chef = await Chefs.find(chefId)

            if (!chef) return res.send("Chef not found")

            const chefRecipes = await Chefs.findChefRecipes(chefId)

            async function getImage(recipeId) {
                let results = await Recipes.files(recipeId)
                return results[0].path
            }

            const recipePromise = chefRecipes.map(async recipe => {
                recipe.image = await getImage(recipe.id)
                recipe.image = `${req.protocol}://${req.headers.host}${recipe.image.replace("public", "")}`

                return recipe
            })

            const recipes = await Promise.all(recipePromise)

            let chefFile = await Chefs.getChefAvatar(chefId)
            let { path } = chefFile
            path = {
                chefAvatar: `${req.protocol}://${req.headers.host}${path.replace("public", "")}`
            }

            return res.render('admin/chefs/chef', { chef, recipes, path })
        } catch (err) {
            console.log(err)
        }
    },
    async edit(req, res) {
        try {
            let results = await Chefs.find(req.params.id)
            const chef = results

            let avatar = await Chefs.files(chef.file_id)
            avatar = avatar.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render('admin/chefs/edit', { chef, avatar })
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

            let results = await Chefs.chefFiles(req.body.id)
            let fileId = results.rows[0].id

            if (req.files.length != 0) {
                const filePromise = req.files.map(file => File.create(file))

                const results = await filePromise[0]
                fileId = results.rows[0].id
            }

            if (req.removed_files) {
                const removedFiles = req.body.removed_files.split(',')
                const lastIndex = removedFiles.length - 1
                removedFiles.splice(lastIndex, 1)

                const filePromises = removedFiles.map(id => File.chefFileDelete(id))

                await Promise.all(filePromises)
            }

            await Chefs.update(req.body, fileId)

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