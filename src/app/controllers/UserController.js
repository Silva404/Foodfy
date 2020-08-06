const User = require('../models/User')

module.exports = {
  async list(req, res) {

  },
  create(req, res) {
    return res.render('admin/users/register')
  },
  async post(req, res) {
    try {
      await User.create(req.body)
    } catch (err) {
      console.error(err)
    }

    return res.redirect('/')
  },
  async put(req, res) {

  },
  async delete(req, res) {

  },
}