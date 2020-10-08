const express = require('express');
const router = express.Router();
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const path = require('path');
const fs = require('fs');

router.get('/picdisplay', (req, res) => {
    var image = `${path.join(__dirname, '..')}/public/uploads/users/${
    req.params.Cust_ProfilePic
  }`;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(
            `${path.join(__dirname, '..')}/public/uploads/users/userplaceholder.jpg`
        );
    }
});