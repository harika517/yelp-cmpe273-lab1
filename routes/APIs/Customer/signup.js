const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysqlConnectionPool = require('/Users/harika_pradeep/Downloads/CMPE273_Fall2020/lab1/config/connectiondbpool');

router.post(
    '/', [
        check('Cust_Name', 'Name is required').not().isEmpty(),
        check('Cust_email_id', 'Please include valid email').isEmail(),
        check(
            'Cust_Password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async(req, res) => {
        // const { Cust_Name, Cust_email_id, Cust_Password } = req.body;
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send('Customer Route');
    }
);

module.exports = router;

//Cust_Name: