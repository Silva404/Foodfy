const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, (err, results) => {
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
            created_at  
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).created
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
            
            // console.log(results.rows[0])
            // console.log(results.rows)

            callback(results.rows[0], results.rows)
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET 
        image=$1,
        title=$2,
        ingredients=$3,
        preparation=$4,
        information=$5
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
    }
}