const User = require('../models/User')

module.exports = {
  async list(req, res) {

  }, 
  create(req, res) {
    return res.render('admin/users/create')
  },
  async post(req, res) {
    const userId = User.create(req.body)

    return res.redirect('/users')    
  },
  async put(req,res){
    
  },
  async delete(req,res){
    
  },
}