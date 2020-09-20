const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  GET (View orders raised by customer) '/customer/orders'
//@desc   Viewing orders by customer for particular restaurant Id.
//@access  Private
//Table Restaurant_Orders

router.get('/:Rest_Name', (req, res) => {
    const Rest_Name = req.params.Rest_Name;
    const customerID = req.params.Cust_Id;
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Restaurant_Orders WHERE Rest_Name='${Rest_Name}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res.status(400).json({
                        errors: [{ msg: 'No orders for this restaurent' }],
                    });
                }
                console.log(result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;