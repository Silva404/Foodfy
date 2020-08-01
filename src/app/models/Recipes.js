const db = require('../../config/db')
const { date } = require('../../lib/utils')
const fs = require('fs')

module.exports = {
    async all() {
        const results = await db.query(`SELECT recipes.*,
        chefs.name AS author
        FROM recipes
        LEFT JOIN chefs 
        ON (chefs.id = recipes.chef_id)
        ORDER BY created_at DESC
        `)

        return results.rows
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
    async find(id) {
        const results = await db.query(`SELECT *, recipes.id AS recipe_id
        FROM recipes 
        INNER JOIN chefs 
        ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
        `, [id])

        return results.rows
    },
    update(data) {
        const query = `
        UPDATE recipes SET 
        title=($1),
        ingredients=($2),
        preparation=($3),
        information=($4)
        WHERE id = $5
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },
    async delete(id) {
        const results = await db.query(`SELECT * FROM recipe_files WHERE recipe_files.recipe_id = $1`, [id])
        const deleteId = results.rows[0].file_id

        const result = await db.query(`SELECT * FROM files WHERE id = $1`, [deleteId])
        const file = result.rows[0]
        fs.unlinkSync(file.path)


        await db.query(`DELETE FROM files WHERE files.id = $1`, [deleteId])
        await db.query(`DELETE FROM recipe_files WHERE recipe_files.recipe_id = $1`, [id])

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
    async files(id) {
        try {
            const results = await db.query(`SELECT files.* 
            FROM files
            LEFT JOIN recipe_files 
            ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1`, [id])

            return results.rows
        } catch (err) {
            console.log(err);
        }
    },
    async recipeFiles(id) {
        const query = `
        SELECT *, (
            SELECT files.path
            FROM files
            LEFT JOIN recipe_files 
            ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1
            LIMIT 1
            ) 
        FROM recipes 
        LEFT JOIN recipe_files ON 
        (recipes.id = recipe_files.recipe_id)
        WHERE recipes.id = $1
        LIMIT 1
        `

        const results = await db.query(query, [id])

        return results.rows
    }
}