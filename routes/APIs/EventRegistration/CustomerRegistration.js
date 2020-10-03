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

module.exports = router;