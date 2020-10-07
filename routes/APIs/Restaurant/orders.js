const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  GET (View orders raised by customer) '/restaurant/orders'
//@desc   Viewing orders by customer for particular restaurant Id.
//@access  Private
//Table Restaurant_Orders

router.get('/', auth, (req, res) => {
    const Rest_email_id = req.customer.id;
    console.log('orders:', Rest_email_id);
    // const customerID = req.params.Cust_Id;
    try {
        console.log('orders:', Rest_email_id);
        mysqlConnectionPool.query(
            `SELECT * FROM Restaurant_Orders WHERE Rest_email_id='${Rest_email_id}'`,
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

//@route  POST (Update ) '/restaurant/orders'
//@desc   Updating Order Status by Restaurant
//@access  Private
//Table Restaurant_Orders

router.post(
    '/update/:order_id', [
        auth, [
            check('order_status', 'Please update order status').not().isEmpty(),
            check('Mode_Of_Delivery', 'Please update Delivery mode status')
            .not()
            .isEmpty(),
        ],
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const order_id = req.params.order_id;
        const { order_status, Mode_Of_Delivery } = req.body;
        console.log('inside order update, ', res);
        try {
            var query = `UPDATE Restaurant_Orders set order_status='${order_status}', Mode_Of_Delivery='${Mode_Of_Delivery}' 
        WHERE order_id='${order_id}'`;
            mysqlConnectionPool.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Invalid Restaurant Order' }] });
                }
                // console.log(result);
                res.status(200).json(result[0]);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);

//@route  GET (View orders by status) '/restaurant/orders'
//@desc   Viewing orders of particular status by restaurant owner.
//@access  Private
//Table Restaurant_Orders
router.get('/orderdetail/:order_id', (req, res) => {
    const order_id = req.params.order_id;
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Restaurant_Orders WHERE order_id='${order_id}'`,
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
                res.status(200).json(result[0]);
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
router.get('/:Rest_Name/:order_status', (req, res) => {
    const order_status = req.params.order_status;
    const Rest_Name = req.body.Rest_Name;
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Restaurant_Orders WHERE order_status='${order_status}' and Rest_Name='${Rest_Name}'`,
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