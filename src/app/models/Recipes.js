const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT recipes.*,
        chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `, (err, results) => {
            if (err) throw `Data error: ${err}`

            callback(results.rows)
        })
    },
    allChefs(callback) {
        db.query(`SELECT * FROM chefs`, (err, results) => {
            if (err) throw `Data error: ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO recipes (
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id 
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id` 

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).created,
            data.chef_id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT *, recipes.id AS recipe_id
        FROM recipes 
        INNER JOIN chefs 
        ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
        `, [id], (err, results) => {
            if (err) throw `Database error: ${err}`
            
            console.log(results.rows[0])
            console.log(results.rows)

            callback(results.rows[0], results.rows)
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET 
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
        WHERE id = $6
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err)`Database error: ${err}`
            
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
            if (err)`Database error: ${err}`

            callback()
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