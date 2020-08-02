const mysql = require('mysql2')

// Pool allows us to run multiple connections
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs'
})

module.exports = pool.promise()