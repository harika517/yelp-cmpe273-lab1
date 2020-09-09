const mysql = require('mysql');

const connectDB = () => {
    var mysqlConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'yelp',
        // multipleStatements: true,
    });

    mysqlConnection.connect((err) => {
        if (!err) {
            console.log('Database Connected');
        } else {
            console.log('Database Connection Failed' + err);
        }
    });
};

module.exports = connectDB;