const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  GET /search/delivery
//@desc   Search restaurants by delivery method = Curbside_PickUp
//@access  Private
//Table Restaurant_Profile
router.get('/Curbside_PickUp', async(req, res) => {
    // const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Restaurant_Information.Rest_Id_signup, Restaurant_Information.Rest_Name, Rest_location, Description, Contact, Timings, ratings FROM Restaurant_Information 
            INNER JOIN reviews_new ON Restaurant_Information.Rest_Id_signup = reviews_new.Rest_Id_signup WHERE 
            Restaurant_Information.Curbside_PickUp="yes"`,
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

//@route  GET /search/delivery
//@desc   Search restaurants by delivery method = Dine_In
//@access  Private
//Table Restaurant_Profile
router.get('/Dine_In', async(req, res) => {
    // const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Restaurant_Information.Rest_Id_signup, Restaurant_Information.Rest_Name, Rest_location, Description, Contact, Timings, ratings FROM Restaurant_Information 
            INNER JOIN reviews_new ON Restaurant_Information.Rest_Id_signup = reviews_new.Rest_Id_signup WHERE 
            Restaurant_Information.Dine_In="yes"`,
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

//@route  GET /search/delivery
//@desc   Search restaurants by delivery method = Yelp_Delivery
//@access  Private
//Table Restaurant_Profile
router.get('/Yelp_Delivery', async(req, res) => {
    // const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Restaurant_Information.Rest_Id_signup, Restaurant_Information.Rest_Name, Rest_location, Description, Contact, Timings, ratings FROM Restaurant_Information 
            INNER JOIN reviews_new ON Restaurant_Information.Rest_Id_signup = reviews_new.Rest_Id_signup WHERE 
            Restaurant_Information.Yelp_Delivery="yes"`,
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