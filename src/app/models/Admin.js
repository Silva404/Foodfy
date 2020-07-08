const db = require('../../config/db')

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
            informationL,
            created_at  
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`

        const values = [ 
            
        ]
    },
    // show,
    // edit,
    // put,
    // delete
}