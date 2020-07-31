const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all() {
        return db.query(`SELECT * FROM chefs`)
    },
    filter(filter, callback) {
        db.query(`SELECT * FROM chefs WHERE chefs.name ILIKE '%${filter}%'`,
            (err, results) => {
                if (err) throw `${err}`

                callback(results.rows)
            })
    },
    create(data, file_id) {
        const query = `
        INSERT INTO chefs (
            name,
            created_at,
            file_id
        ) VALUES ($1, $2, $3)
        RETURNING id
        `
        
        const values = [
            data.name,
            date(Date.now()).created,
            file_id
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
    update(data, file_id) {
        const query = ` 
        UPDATE chefs SET
        name=($1),
        file_id=($2)
        WHERE id = $3 
        `

        const values = [
            data.name,
            file_id,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
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
    },
    files(id) {
        return db.query(`SELECT files.path FROM files WHERE files.id = $1 `, [id])
    },
    chefFiles(id) {
        const query = `
        SELECT files.*
        FROM files 
        LEFT JOIN chefs
        ON (files.id = chefs.file_id) 
        WHERE chefs.id = $1
        `

        return db.query(query, [id])
    }
}