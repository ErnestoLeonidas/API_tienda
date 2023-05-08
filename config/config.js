const mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'prueba',
    port: 8889
});

connection.connect(function(err) {
    if (err) console.log(err);
});
    
module.exports = connection;  