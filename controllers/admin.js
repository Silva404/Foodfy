const fs = require('fs')
const data = require('../data.json')

exports.index = (req, res) => {
    return res.render('admin/recipes', { recipes: data.recipes })
}

exports.create = (req, res) => {
    return res.render('./admin/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    console.log(keys)
    console.log(req.body)

    for (let key of keys) {
        if (res.body[key] == "") {
            return res.send('Please, fill all the fields.')
        }
    }

    data.recipes.push(req.body)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error ocurred while writing file.')
        return res.redirect('admin/recipes')
    })
}