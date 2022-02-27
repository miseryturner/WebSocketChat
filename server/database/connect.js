const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'messanger',
    password: ''
})

module.exports = pool;