const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, (err, results) => {
            if (err) throw `Data error: ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM recipes WHERE id = $1`, (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    }
}