const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  GET (Inerting profile) '/restaurant/reviews'
//@desc   viewing the reviews given by cutomer for particular restaurant Id.
//@access  Private
//Table Restaurant_Profile

router.get('/:Rest_Id_signup/:Cust_Id', (req, res) => {
    const restaurantID = req.params.Rest_Id_signup;
    const customerID = req.params.Cust_Id;
    try {
        mysqlConnectionPool.query(
            `SELECT
            Cust_Name,
            Rest_Name,
            Review
          FROM
            Customer_Information,
            Restaurant_Information,
            customer_reviews
          WHERE
            Customer_Information.Cust_Id = ${customerID}
            AND Restaurant_Information.Rest_Id_signup = ${restaurantID}
          `,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({
                            errors: [
                                { msg: 'Restaurant Reviews doesnt Exists from this customer' },
                            ],
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