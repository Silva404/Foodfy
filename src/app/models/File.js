const db = require('../../config/db')
const fs = require('fs')

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
    async createChefFiles({ data ,filename, path }) {
        let query = `
        INSERT INTO files (
            name,
            path            
        ) VALUES ($1, $2)
        RETURNING id
        `

        let values = [
            filename,
            path
        ]

        const results = await db.query(query, values)
        const fileId = results.rows[0].id

        query = ` 
        UPDATE chefs SET
        name=($1),
        file_id=($2)
        WHERE id = $3 
        `

        values = [
            data.name,
            fileId,
            data.id
        ]

        return db.query(query, values)
    },
    async createRecipeFiles({ filename, path, recipe_id }) {
        let query = `
        INSERT INTO files (
            name,
            path            
        ) VALUES ($1, $2)
        RETURNING id
        `

        let values = [
            filename,
            path
        ]

        const results = await db.query(query, values)
        const fileid = results.rows[0].id

        query = `
        INSERT INTO recipe_files (
            recipe_id,
            file_id
        ) VALUES ($1, $2)
        RETURNING id
        `

        values = [
            recipe_id,
            fileid
        ]

        return db.query(query, values)
    },
    async delete(id) {
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]
            fs.unlinkSync(file.path)
            // LOCAL DELETE

            await db.query(`DELETE FROM recipe_files WHERE recipe_files.file_id = $1`, [id])

            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch (err) {
            console.log(err)
        }
    },
    async updateChefFiles() {
        let query = `
        INSERT INTO files (
            name,
            path            
        ) VALUES ($1, $2)
        RETURNING id
        `

        let values = [
            filename,
            path
        ]

        const results = await db.query(query, values)
        const fileId = results.rows[0].id

        query = ` 
        UPDATE chefs SET
        name=($1),
        file_id=($2)
        WHERE id = $3 
        `

        values = [
            data.name,
            fileId,
            data.id
        ]

        return db.query(query, values)
    }
}