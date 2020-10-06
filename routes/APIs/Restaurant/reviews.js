const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

// //@route  GET (Customer creating Reviews to a restaurant) '/restaurant/reviews'
// //@desc   get all the reviews by Rest_Name Orde by date time
// //@access  Private
// //Table reviews

router.get('/:Rest_Id_signup', auth, async(req, res) => {
    const Rest_Id_signup = req.params.Rest_Id_signup;
    // const Cust_Id = req.customer.key;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT review, Date, ratings FROM reviews_new WHERE Rest_Id_signup='${Rest_Id_signup}' ORDER BY Date`,
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

// //@route  POST (Customer creating Reviews to a restaurant) '/customer/reviews'
// //@desc   Inserting Reviews
// //@access  Private
// //Table reviews

// router.post(
//     '/me', [
//         check('Cust_Name', 'Customer name is required').not().isEmpty(),
//         check('Rest_Name', 'Restaurant name is required').not().isEmpty(),
//         check('review', 'Please write a review').not().isEmpty(),
//     ],
//     (req, res) => {
//         // console.log(req.body);
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { Cust_Name, Rest_Name, review } = req.body;
//         // See if user exists
//         try {
//             mysqlConnectionPool.query(
//                 `INSERT into reviews (Cust_Name,
//                     Rest_Name,
//                     review) VALUES ('${Cust_Name}', '${Rest_Name}', '${review}')`,
//                 (error, result) => {
//                     if (error) {
//                         console.log(error);
//                         return res.status(500).send('Server Error');
//                     }
//                     res.status(200).json({ result });
//                 }
//             );
//             //res.send('Customer Registered');
//         } catch (error) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }

//         //return jsonwebtoken
//     }
// );

//@route  GET (viewing Customer reviews on particular restaurant) '/restaurant/reviews'
//@desc   viewing the reviews given by cutomer for particular restaurant Id.
//@access  Private
//Table Restaurant_Profile

// router.get('/:Rest_Id_signup/:Cust_Id', (req, res) => {
//     const restaurantID = req.params.Rest_Id_signup;
//     const customerID = req.params.Cust_Id;
//     try {
//         mysqlConnectionPool.query(
//             `SELECT
//             Cust_Name,
//             Rest_Name,
//             Review
//           FROM
//             Customer_Information,
//             Restaurant_Information,
//             customer_reviews
//           WHERE
//             Customer_Information.Cust_Id = ${customerID}
//             AND Restaurant_Information.Rest_Id_signup = ${restaurantID}
//           `,
//             (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Server Error');
//                 }
//                 if (result.length === 0) {
//                     return res.status(400).json({
//                         errors: [
//                             { msg: 'Restaurant Reviews doesnt Exists from this customer' },
//                         ],
//                     });
//                 }
//                 console.log(result);
//                 res.status(200).json({ result });
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;