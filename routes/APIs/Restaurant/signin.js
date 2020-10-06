const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route POST /restaurant/auth
//@desc  Test route
//@access Public

router.get('/', auth, async(req, res) => {
    const Rest_email_id = req.customer.id;
    console.log('Restaurant sigin get get', Rest_email_id);
    try {
        mysqlConnectionPool.query(
            `SELECT Rest_Name, Rest_email_id, Rest_location FROM Restaurant_Information WHERE Rest_email_id = '${Rest_email_id}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Database Server Error');
                }
                // if (result.hasOwnProperty('Rest_Name')) {
                //     console.log('Print this', result.Rest_Name);
                // }
                console.log('Here ', result);
                // console.log(JSON.stringify(result));
                // res.send(JSON.stringify(result));
                res.status(200).json({ result });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

//@route POST /restaurant/signIn
//@desc  Test route
//@access Public

router.post(
    '/', [
        check('Rest_email_id', 'Please include valid email').isEmail(),
        check('Rest_Password', 'Password is required').exists(),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Rest_email_id, Rest_Password } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `SELECT Rest_Id_signup, Rest_Password, Rest_email_id FROM Restaurant_Information WHERE Rest_email_id = '${Rest_email_id}'`,
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
                        Rest_Password,
                        result[0].Rest_Password
                    );

                    if (!matchCriteria) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Ceredentials' }] });
                    }
                    const payload = {
                        customer: {
                            id: Rest_email_id,
                            key: result[0].Rest_Id_signup,
                        },
                    };
                    console.log('RestLogin', result[0].Rest_Id_signup);
                    jwt.sign(
                        payload,
                        config.get('jwtSecret'), { expiresIn: 360000 },
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