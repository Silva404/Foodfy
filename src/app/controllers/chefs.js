const Chefs = require('../models/Chefs')

module.exports = {
    index(req, res) {
        Chefs.all(chefs => {
            return res.render('chefs/chefs', { chefs })
        })
    },
    create(req, res) {
        return res.render('./chefs/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Chefs.create(req.body, chef => {
            res.redirect(`chefs/chef/${chef.id}`)
        })
    },
    show(req, res) {
        Chefs.find(req.params.id, chef => {
            if (!chef) {
                res.send('Recipe not found.')
            }
    
            return res.render('chefs/chef', { chefs: chef })
        })
    },
    edit(req, res) {
        Chefs.find(req.params.id, chef => {
            if (!chef) {
                res.send('Recipe not found.')
            }

    
            return res.render('chefs/edit', { chefs: chef })
        })        
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') return res.send('Please, fill and the fields.')
        }

        Chefs.update(req.body, () => {
            return res.redirect(`/chefs/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chefs.delete(req.body.id, () => {
           return res.redirect('/chefs/chefs')
        })
    }
}