const db = require("../../config/db")
const crypt = require('crypto')

module.exports = {
  async findUser(id) {
    const results = await db.query(`SELECT * FROM users WHERE id = $1`, [id])

    return results.rows[0]
  },
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
    INSERT INTO users (
      name,
      email,
      password,
      is_admin
    ) VALUES ($1, $2, $3, $4)
    RETURNING id`

    const newPassword = crypt.randomBytes(8).toString('hex')

    const values = [
      data.name,
      data.email,
      newPassword,
      data.is_admin || false,
    ]

    const results = await db.query(query, values)

    return results.rows[0]
  }
}