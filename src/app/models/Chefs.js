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
        db.query(`SELECT * FROM chefs 
        WHERE chefs.id = $1
        `, [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },
    findChef(id, callback) {
        db.query(`SELECT * 
        FROM chefs 
        INNER JOIN recipes 
        ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        `, [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0], results.rows, results.rowCount)
        })
    },
    update(data, callback) {
        const query = `
        UPDATE chefs SET
        name=$1,
        avatar_url=$2
        WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback()
        })
    }
}