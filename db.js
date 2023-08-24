// db.js
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root', /* MySQL User */
    database: 'blog' /* MySQL Database */
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected with App...');
});

module.exports = conn;
