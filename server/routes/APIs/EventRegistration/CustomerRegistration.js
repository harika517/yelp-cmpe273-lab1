const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Insert Customer Registration actions ) '/customer/registration/:customer/:Rest_Name/:Event_Name'
//@desc   Creating an event
//@access  Private
//Table Restaurant_Dishes
//Event_Registration
router.post('/:Cust_Name/:Event_Name', auth, (req, res) => {
    // console.log(req.body);
    // const { Event_Date, Event_time } = req.body;
    const { Cust_Name, Event_Name } = req.params;
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `INSERT into Event_Registration (Cust_Name,
                    Event_Name) VALUES ('${Cust_Name}', '${Event_Name}')`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                res.status(200).json({ result });
            }
        );
        //res.send('Customer Registered');
    } catch (error) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }

    //return jsonwebtoken
});

//@route  GET (Insert Customer Registration actions ) '/customer/registration/:Cust_Name'
//@desc   Get all the events registered by me
//@access  Private
//Table Restaurant_Dishes
//Event_Registration

router.get('/:Cust_Name', auth, async(req, res) => {
    const Cust_Name = req.params.Cust_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Cust_Name, Event_Name FROM Event_Registration WHERE Cust_Name='${Cust_Name}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'No reviews for this restaurant' }] });
                }
                // console.log('Restaurant get/me:', result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;