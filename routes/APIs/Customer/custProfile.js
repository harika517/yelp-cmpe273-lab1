const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const { response } = require('express');

//@route  GET api/customerprofile/cust_id
//@desc   get our profile based on the customer id
//@access  Private
//Table Customer_Information

router.get('/', async(req, res) => {
    try {
        mysqlConnectionPool.query(
            `SELECT * from Customer_Information`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                //console.log(result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.get('/:Cust_Id', async(req, res) => {
    const customerID = req.params.Cust_Id;
    try {
        mysqlConnectionPool.query(
            `SELECT * from Customer_Information WHERE Cust_Id='${customerID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                //console.log(result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
//@route  Post api/Customer/profile
//@desc   Create or update customerprofile
//@access  Private
// For all these profile settings fix if user profile already exists and if user id doesnt exists
router.post(
    '/basicdetails/:Cust_Id', [
        check('First_Name', 'First Name is required').not().isEmpty(),
        check('Last_Name', 'Last Name is required').not().isEmpty(),
        check('City', 'City name is required').not().isEmpty(),
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
                console.log(result);
                res.status(200).json({ result });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);
//@route  POST api/Customer/profile
//@desc  update customer contact information
//@access  Private

// Fix the thing if email Id already exists
router.post(
    '/Contact_Info/:Cust_Id', [
        check('Cust_email_id', 'Email ID is required').not().isEmpty(),
        check('Phone_Number', 'Phone Number is required').not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Cust_email_id, Phone_Number } = req.body;
        const customerID = req.params.Cust_Id;
        try {
            var query = `UPDATE Customer_Information set Cust_email_id='${Cust_email_id}', Phone_Number='${Phone_Number}' WHERE Cust_Id='${customerID}'`;
            mysqlConnectionPool.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
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

//@route  POST api/Customer/profile
//@desc  update customer About information
//@access  Private

router.post('/Custabout/:Cust_Id', (req, res) => {
    const {
        Yelping_Since,
        Things_I_Love,
        My_Blog_Or_Website,
        Find_Me_In,
        My_Favourite_Movie,
        Current_Crush,
    } = req.body;
    const customerID = req.params.Cust_Id;
    try {
        var query = `UPDATE Customer_Information set Yelping_Since='${Yelping_Since}', Things_I_Love='${Things_I_Love}', 
        My_Blog_Or_Website='${My_Blog_Or_Website}', Find_Me_In='${Find_Me_In}', My_Favourite_Movie='${My_Favourite_Movie}', 
        Current_Crush='${Current_Crush}' WHERE Cust_Id='${customerID}'`;
        mysqlConnectionPool.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }
            console.log(result);
            res.status(200).json({ result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// router.post(
//     '/profilePicture/:Cust_Id', [
//         check('First_Name', 'First Name is required').not().isEmpty(),
//         check('Last_Name', 'Last Name is required').not().isEmpty(),
//         check('City', 'City name is required').not().isEmpty(),
//     ],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const {
//             First_Name,
//             Last_Name,
//             Date_of_Birth,
//             City,
//             State,
//             Country,
//             Nick_Name,
//             Headline,
//         } = req.body;
//     }
// );
module.exports = router;