const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  GET /searchresult/restaurants
//@desc   Search restaurants by input text
//@access  Private
//Table Restaurant_Profile

router.get('/:input_text', async(req, res) => {
    // const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    const input_text = req.params.input_text;
    try {
        mysqlConnectionPool.query(
            `select yelp.Restaurant_Information.Rest_Id_signup, yelp.Restaurant_Information.Rest_Name, 
           yelp.Restaurant_Information.Rest_email_id from yelp.Restaurant_Information WHERE 
           lower(yelp.Restaurant_Information.Rest_location) like '%${input_text}%' OR 
           lower(yelp.Restaurant_Information.Cuisine) like '%${input_text}%'
           union 
           select yelp.Restaurant_Dishes.Rest_Id_signup, yelp.Restaurant_Dishes.Rest_Name, 
           yelp.Restaurant_Dishes.Rest_email_id from yelp.Restaurant_Dishes where 
           lower(yelp.Restaurant_Dishes.item_name) like '%${input_text}%'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Restaurants doesnt Exists' }] });
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

module.exports = router;