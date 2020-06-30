const fs = require('fs')

exports.index = (requisition, response) => {
    return response.render('recipes')
}

exports.create = (requisition, response) => {
    return response.render('./admin/create.njk')
}

exports.show = (requisition, response) => {
    
}

exports.edit = (requisition, response) => {
    
}

exports.post = (requisition, response) => {
    
}
exports.put = (requisition, response) => {
    
}
exports.delete = (requisition, response) => {
    
}