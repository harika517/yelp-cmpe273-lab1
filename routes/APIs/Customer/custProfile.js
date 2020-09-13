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

// router.post(
//     '/basicdetails/:Cust_Id', [
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

// router.post(
//     '/basicdetails/:Cust_Id', [
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

// router.post(
//     '/basicdetails/:Cust_Id', [
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