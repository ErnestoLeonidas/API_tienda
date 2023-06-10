const mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    host: '138.128.182.130',
    user: 'wan723_admin_libros',
    password: 'Libros123.,',
    database: 'wan723_libros',
    port: 3306
});

connection.connect(function(err) {
    if (err) console.log(err);
});
    
module.exports = connection;  