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

        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT chefs.*, 
        recipes.title AS recipes_name,  
        recipes.id AS recipes_id
        FROM chefs 
        LEFT JOIN recipes 
        ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        `, [id])
    },
    update(data) {
        const query = ` 
        UPDATE chefs SET
        name=($1),
        avatar_url=($2)
        WHERE id = $3 
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        let { filter, callback, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*)
                FROM chefs 
            ) AS total`

        if (filter) {
            filterQuery = `
                WHERE chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*)
                FROM chefs 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT chefs.*,
        ${totalQuery}
        FROM chefs 
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {
            if (err) throw `${err}`

            callback(results.rows)
        })
    }
}