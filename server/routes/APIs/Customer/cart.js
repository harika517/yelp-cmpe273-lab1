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
router.post('/:Rest_Id_signup/:item_id', auth, (req, res) => {
    console.log('Print Elements');
    const { Rest_Id_signup, item_id } = req.params;
    const Cust_Id = req.customer.key;
    // //const Rest_Name = req.body.Rest_Name;
    // const customerID = req.params.Cust_Id;
    // const restaurantName = req.params.Rest_Name;

    console.log('Orders');
    try {
        var query = `INSERT into Cart_Items (Cust_Id, Rest_Id_signup, item_id) VALUES
            ('${Cust_Id}','${Rest_Id_signup}','${item_id}', 'New Order')`;
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
});
module.exports = router;