const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  POST (Inerting reviews by customer) '/customer/reviews'
//@desc   viewing the reviews given by cutomer for particular restaurant Id.
//@access  Private
//Table reviews
router.post(
    '/', [
        auth, [
            check('Rest_Name', 'Please enter Restaurant Name').not().isEmpty(),
            check('review', 'Please enter review').not().isEmpty(),
            check('ratings', 'Please enter ratings').not().isEmpty(),
        ],
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Rest_Name, review, ratings } = req.body;
        console.log('Is this getting hit', req.body.Rest_Name);
        //const customerID = req.params.Cust_Name;
        // const restaurantID = req.params.Rest_Name;
        console.log('print this');
        try {
            var query = `INSERT INTO reviews (Rest_Name, review, ratings) VALUES
            ('${Rest_Name}','${review}', '${ratings}')`;
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

// router.post(
//     '/:Cust_Id/:Rest_Id_signup', [check('Review', 'Please enter review').not().isEmpty()],
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const Review = req.body.Review;
//         const customerID = req.params.Cust_Id;
//         const restaurantID = req.params.Rest_Id_signup;
//         try {
//             var query = `INSERT into customer_reviews (Cust_Id, Rest_Id_signup, Review) VALUES
//             ('${customerID}','${restaurantID}','${Review}')`;
//             mysqlConnectionPool.query(query, (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Database Error');
//                 }
//                 console.log(result);
//                 res.status(200).json({ result });
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Server Error');
//         }
//     }
// );

module.exports = router;