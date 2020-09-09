const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'yelp',
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Database Connected');
    } else {
        console.log('Database Connection Failed');
    }
});

app.listen(PORT, () => {
    console.log('Server listening to port ' + PORT);
});