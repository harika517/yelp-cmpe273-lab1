const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Inerting orders by customer) '/customer/orders'
//@desc   Creating orders by customer for particular restaurant Id.
//@access  Private
//Table Restaurant_Orders

router.post(
    '/:Cust_Id/:Rest_Name', [check('item_name', 'Please enter Item Name').not().isEmpty()],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const item_name = req.body.item_name;
        //const Rest_Name = req.body.Rest_Name;
        const customerID = req.params.Cust_Id;
        const restaurantName = req.params.Rest_Name;
        try {
            var query = `INSERT into Restaurant_Orders (Cust_Id, Rest_Name, item_name, delivery_status, order_status) VALUES
            ('${customerID}','${restaurantName}','${item_name}', 'Order Received', 'New Order')`;
            mysqlConnectionPool.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Database Error');
                }
                console.log(result);
                res.status(200).json({ result });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;