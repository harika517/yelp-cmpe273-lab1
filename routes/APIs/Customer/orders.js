const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Inerting orders by customer) '/customer/orders'
//@desc   Creating orders by customer for particular restaurant Id.
//@access  Private
//Table Restaurant_Orders
// Not working
router.post(
    '/me', [
        auth, [
            check('item_name', 'Please enter Item Name').not().isEmpty(),
            check('Cust_Name', 'Please enter your Name').not().isEmpty(),
            check('Rest_email_id', 'Restaurant Name').not().isEmpty(),
            check('Mode_Of_Delivery', 'Please choose delivery method')
            .not()
            .isEmpty(),
        ],
    ],
    (req, res) => {
        // console.log('First Order');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('Print Elements');
        const { item_name, Cust_Name, Mode_Of_Delivery, Rest_email_id } = req.body;
        // //const Rest_Name = req.body.Rest_Name;
        // const customerID = req.params.Cust_Id;
        // const restaurantName = req.params.Rest_Name;

        console.log('Orders');
        try {
            var query = `INSERT into Restaurant_Orders (Cust_Name, item_name, order_status, Mode_Of_Delivery, Rest_email_id) VALUES
            ('${Cust_Name}','${item_name}', 'New Order', '${Mode_Of_Delivery}', '${Rest_email_id}')`;
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