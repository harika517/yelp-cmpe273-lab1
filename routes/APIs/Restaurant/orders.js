const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  GET (View orders raised by customer) '/restaurant/orders'
//@desc   Viewing orders by customer for particular restaurant Id.
//@access  Private
//Table Restaurant_Orders

router.get('/:Rest_Name', (req, res) => {
    const Rest_Name = req.params.Rest_Name;
    // const customerID = req.params.Cust_Id;
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

//@route  GET (View orders by status) '/restaurant/orders'
//@desc   Viewing orders of particular status by restaurant owner.
//@access  Private
//Table Restaurant_Orders
router.get('/:order_status', (req, res) => {
    const order_status = req.params.order_status;
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Restaurant_Orders WHERE order_status='${order_status}'`,
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