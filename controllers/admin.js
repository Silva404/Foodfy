const fs = require('fs')
// const recipeData = require('../recipe.json')

exports.index = (requisition, response) => {
    return response.render('admin/recipes', { recipe: data.recipes })
}

exports.create = (requisition, response) => {
    return response.render('./admin/create')
}

exports.post = (requisition, response) => {
    const keys = Object.keys(requisition.body)

    for (let key of keys) {
        if (response.body[key] == '') response.send('Please fill all the fields.')
    }

    fs.writeFile('data.json', JSON.stringify(requisition.body), err => {
        if (err) return response.send('Error ocurred while writing file.')

        return response.redirect('admin/recipes/')
    })
}

exports.show = (requisition, response) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find( recipe => recipe.id == id )
    if (!foundRecipe) return response.send('Recipe not found.')

    return response.render('./admin/recipe', { recipe: data.recipes})
}

exports.edit = (requisition, response) => {
    return response.render('./admin/create', { recipe: data.recipes})
}

exports.put = (requisition, response) => {

}
exports.delete = (requisition, response) => {

}