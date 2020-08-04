const User = require('../models/User')

module.exports = {
  async list(req, res) {

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