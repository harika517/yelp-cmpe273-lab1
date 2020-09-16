const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  GET (view profile) /restaurant/profile
//@desc   get profile of particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Profile

//name, location, description, contact information, pictures of restaurant and dishes, timings
// `SELECT * from Restaurant_Profile WHERE rest_id='${restaurantID}'`,
router.get('/restaurant/profile/:rest_id', async(req, res) => {
    const restaurantID = req.params.rest_id;
    try {
        mysqlConnectionPool.query(
            `SELECT Restaurant_Profile.Rest_Name, Restaurant_Profile.Location, Restaurant_Profile.Description,
            Restaurant_Profile.Contact, Restaurant_Profile.Image, Restaurant_Dishes.item_name, Restaurant_Dishes.item_image,
            Restaurant_Profile.Timings FROM Restaurant_Dishes INNER JOIN Restaurant_Profile ON 
            Restaurant_Dishes.'${restaurantID}' = Restaurant_Profile.'${restaurantID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Customer doesnt Exists' }] });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  POST (Update profile) /restaurant/profile
//@desc   Update profile of particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Profile

router.post(
    '/restaurant/profile/:rest_id', [
        check('Rest_Name', 'Restaurant Name is required').not().isEmpty(),
        check('Location', 'Restaurant Location is required').not().isEmpty(),
        check('Contact', 'Restaurant Contact is required').not().isEmpty(),
        check('Timings', 'Restaurant timings is required').not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            First_Name,
            Last_Name,
            Date_of_Birth,
            City,
            State,
            Country,
            Nick_Name,
            Headline,
        } = req.body;
        const customerID = req.params.Cust_Id;
        try {
            var query = `UPDATE Customer_Information set First_Name='${First_Name}', Last_Name='${Last_Name}', Date_of_Birth='${Date_of_Birth}',
                City ='${City}',  State='${State}', Country='${Country}', Nick_Name='${Nick_Name}', Headline='${Headline}' WHERE Cust_Id='${customerID}'`;
            mysqlConnectionPool.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Customer doesnt Exists' }] });
                }
                // console.log(result);
                // res.status(200).json({ result });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;