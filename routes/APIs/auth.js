const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const mysqlConnectionPool = require('../../config/connectiondbpool');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET /customer/auth
//@desc  Test route
//@access Public
router.get('/', auth, async(req, res) => {
    const Cust_email_id = req.customer.id;
    console.log('AuthPlace get', Cust_email_id);
    try {
        mysqlConnectionPool.query(
            `SELECT Cust_Id, Cust_Name, Cust_email_id, Cust_ProfilePic FROM Customer_Information WHERE Cust_email_id = '${Cust_email_id}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Database Server Error');
                }
                // console.log('Here ' + result);
                // console.log(JSON.stringify(result));
                // res.send(JSON.stringify(result));
                res.json(result);
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

//@route POST /customer/auth
//@desc  Test route
//@access Public
router.post(
    '/', [
        check('Cust_email_id', 'Please include valid email').isEmail(),
        check('Cust_Password', 'Password is required').exists(),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Cust_email_id, Cust_Password } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `SELECT Cust_Password, Cust_email_id FROM Customer_Information WHERE Cust_email_id = '${Cust_email_id}'`,
                async(error, result) => {
                    //console.log(result[0].Cust_Password);
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length === 0) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Credentials' }] });
                    }

                    const matchCriteria = await bcrypt.compare(
                        Cust_Password,
                        result[0].Cust_Password
                    );

                    if (!matchCriteria) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Credentials' }] });
                    }
                    const payload = {
                        customer: {
                            id: Cust_email_id,
                        },
                    };
                    jwt.sign(
                        payload,
                        config.get('jwtSecret'), { expiresIn: 36000000 },
                        (error, token) => {
                            if (error) throw error;
                            res.json({ token });
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