const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Inerting reviews by customer) '/customer/reviews'
//@desc   viewing the reviews given by cutomer for particular restaurant Id.
//@access  Private
//Table customer_reviews

router.post(
    '/:Cust_Id/:Rest_Id_signup', [check('Review', 'Please enter review').not().isEmpty()],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const Review = req.body.Review;
        const customerID = req.params.Cust_Id;
        const restaurantID = req.params.Rest_Id_signup;
        try {
            var query = `INSERT into customer_reviews (Cust_Id, Rest_Id_signup, Review) VALUES
            ('${customerID}','${restaurantID}','${Review}')`;
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