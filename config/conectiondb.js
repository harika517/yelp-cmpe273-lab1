const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'yelp',
    insecureAuth: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Database Connected');
    } else {
        console.log('Database Connection Failed' + err);
    }
});

module.exports = mysqlConnection;