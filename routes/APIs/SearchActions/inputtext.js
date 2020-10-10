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
            `select yelp.Restaurant_Information.Rest_Name from yelp.Restaurant_Information WHERE 
           lower(yelp.Restaurant_Information.Rest_location) like '%${input_text}%' OR 
           lower(yelp.Restaurant_Information.Cuisine) like '%${input_text}%'
           union 
           select yelp.Restaurant_Dishes.Rest_Name from yelp.Restaurant_Dishes where 
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
                console.log('Restaurant get/me:', result);
                const Rest_Name = result.map((item) => {
                    return item.Rest_Name;
                });
                console.log('rest names are', Rest_Name);
                //res.status(200).json({ result });
                query = `select * from yelp.Restaurant_Information where yelp.Restaurant_Information.Rest_Name in (?)`;
                queryData = [Rest_Name];
                mysqlConnectionPool.query(query, queryData, (error1, result1) => {
                    console.log('rest names are', Rest_Name);
                    if (error1) {
                        console.log(error1);
                        return res.status(500).send('Server Error');
                    }
                    if (result1.length === 0) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Restaurants doesnt Exists' }] });
                    }
                    console.log('Restaurants search result is', result1);
                    res.status(200).json({ result1 });
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;