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
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Cust_Name, Cust_email_id, Cust_Password } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `SELECT Cust_email_id FROM Customer_Information WHERE Cust_email_id = '${Cust_email_id}'`,
                async(error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length > 0) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Customer Already Exists' }] });
                    }

                    //Encrypt password using bcrypt
                    const salt = await bcrypt.genSalt(10);
                    const passwordEncrypted = await bcrypt.hash(Cust_Password, salt);
                    mysqlConnectionPool.query(
                        `INSERT into Customer_Information (Cust_Name, Cust_email_id, Cust_Password) 
                        VALUES ('${Cust_Name}', '${Cust_email_id}', '${passwordEncrypted}')`,
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).send('Server Error');
                            }
                            res.send('Customer Registered');
                        }
                    );
                }
            );
            //res.send('Customer Registered');
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        //return jsonwebtoken
    }
);

module.exports = router;

//Cust_Name: