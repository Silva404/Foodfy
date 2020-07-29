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
        return db.query(`SELECT * FROM chefs`)
    },
    create(data) {
        const query = `
        INSERT INTO recipes (
            title,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id 
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id` 

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).created,
            data.chef_id
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT *, recipes.id AS recipe_id
        FROM recipes 
        INNER JOIN chefs 
        ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
        `, [id])
    },
    update(data) {
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

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    paginate(params) {
        let { filter, callback, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*)
                FROM recipes 
            ) AS total`

        if (filter) {
            filterQuery = `
                WHERE recipes.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*)
                FROM recipes 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT recipes.*,
        chefs.name AS chef_name,
        ${totalQuery}
        FROM recipes
        ${filterQuery}
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {
            if (err) throw `${err}`

            callback(results.rows)
        })
    },
    files(id) {
        return db.query(`SELECT files.* 
        FROM files
        LEFT JOIN recipe_files 
        ON (files.id = recipe_files.file_id)
        WHERE recipe_files.recipe_id = $1`, [id])
    }
}