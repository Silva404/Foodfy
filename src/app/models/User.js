const db = require("../../config/db")
const { hash } = require('bcryptjs')

module.exports = {
  async findOne(filters){
    let query = `SELECT * FROM users`

    Object.keys(filters).map(key => {
      query = `${query} ${key}`

      Object.keys(filters[key]).map(field => {
        query = `${query} ${field} = ${filters[key][field]}`
      })
    })

    const results = await db.query(query)

    return results.rows[0]
  },
  async create(data){
    const query = `
    INSERT INTO users(
      name,
      email,
      password,
      is_admin
    )
    `
    const passwordHash = 1

    const values = [
      data.name,
      data.email,
      passwordHash,
      false
    ]

    const results = await db.query(query, values)

    return results.rows[0].id
  }
}