const mysql = require('mysql');

var conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

conn.connect((err) => {
    if (err) throw err;
    console.log('DB: ' + conn.state);
});

module.exports = conn;