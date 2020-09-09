const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysqlConnectionPool = require('/Users/harika_pradeep/Downloads/CMPE273_Fall2020/lab1/config/connectiondbpool');

router.post('/', async(req, res) => {
    const { Cust_Name, Cust_email_id, Cust_Password } = req.body;
    console.log(req.body);
    res.send('Customer Route');
});

module.exports = router;