const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`,
            (err, results) => {
                if (err)`Database error: ${err}`

                callback(results.rows)
            })
    },
    filter(filter, callback) {
        db.query(`SELECT * FROM chefs WHERE chefs.name ILIKE '%${filter}%'`,
            (err, results) => {
                if (err) throw `${err}`

                callback(results.rows)
            })
    },
    create({ filename, path }) {
        const query = `
        INSERT INTO files (
            name,
            path            
        ) VALUES ($1, $2)
        RETURNING id
        `

        const values = [
            filename,
            path
        ]

        return db.query(query, values)
    }
}