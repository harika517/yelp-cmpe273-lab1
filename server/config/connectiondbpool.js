const mysql = require('mysql');

var mysqlConnectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'yelp',
    insecureAuth: true,
    connectionLimit: 12,
});

mysqlConnectionPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection failed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Databse connection was lost');
        }
    } else if (connection) {
        connection.release();
        return;
    }
});

module.exports = mysqlConnectionPool;