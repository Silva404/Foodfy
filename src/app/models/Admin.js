const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`, (err, results) => {
            if (err) throw `Data error: ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
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
            date(data.created_at).created
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },
    // find,
    // edit,
    // put,
    // delete
}