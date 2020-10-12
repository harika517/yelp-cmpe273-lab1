// check if this is required

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  GET all the restaurants /search/restaurants
//@desc   Get all the restaurants available
//@access  Public
//Table Restaurant_Profile
router.get('/searchrestaurants', async(req, res) => {
    // const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT * from Restaurant_Information`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'No Restaurants exists' }] });
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