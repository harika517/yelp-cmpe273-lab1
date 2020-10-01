const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route POST /restaurant/signUP
//@desc  Test route
//@access Public
router.post(
    '/', [
        check('Rest_Name', 'Name is required').not().isEmpty(),
        check('Rest_email_id', 'Please include valid email').isEmail(),
        check('Rest_location', 'Please include location details').not().isEmpty(),
        check(
            'Rest_Password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Rest_Name, Rest_email_id, Rest_Password, Rest_location } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `SELECT Rest_email_id FROM Restaurant_Information WHERE Rest_email_id= '${Rest_email_id}'`,
                async(error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length > 0) {
                        return res.status(400).json({
                            errors: [{ msg: 'Restaurant Information Already Exists' }],
                        });
                    }

                    //Encrypt password using bcrypt
                    const salt = await bcrypt.genSalt(10);
                    const passwordEncrypted = await bcrypt.hash(Rest_Password, salt);
                    mysqlConnectionPool.query(
                        `INSERT into Restaurant_Information (Rest_Name, Rest_email_id, Rest_Password, Rest_location) 
                        VALUES ('${Rest_Name}', '${Rest_email_id}', '${passwordEncrypted}', '${Rest_location}')`,
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).send('Server Error');
                            }
                            const payload = {
                                customer: {
                                    id: Rest_email_id,
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