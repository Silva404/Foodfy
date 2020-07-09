const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`, (err, results) => {
            if (err)`Database error: ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO chefs (
            name,
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3)
        RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).created
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`


            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },
    update() {

    },
    delete() {

    }
}