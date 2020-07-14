const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'user1',
    port: 5432,
    database: 'foodfy'
}) 