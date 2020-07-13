const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *, recipes.id AS recipe_id
        FROM recipes
        INNER JOIN chefs 
        ON (recipes.chef_id = chefs.id)
        `, 
         (err, results) => {
            if (err) throw `Data error: ${err}`          

            callback(results.rows)
        })
    }, 
    filter(filter, callback) {
        db.query(`SELECT *, recipes.id AS recipe_id
        FROM recipes
        INNER JOIN chefs 
        ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'`, 
        (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM recipes
        INNER JOIN chefs 
        ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, 
        [id], (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    }
}