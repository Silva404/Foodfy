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
    create(data) {
        const query = `
        INSERT INTO chefs (
            name,
            path            
        ) VALUES ($1, $2)
        RETURNING id
        `

        const values = [
            data.name,
            date(Date.now()).created
        ]

        return db.query(query, values)
    }
}