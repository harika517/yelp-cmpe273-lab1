const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');
const { response } = require('express');

//@route  GET customer/profile
//@desc   get all the customer profiles
//@access  Public
//Table Customer_Information
// not using anywhere
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

//@route  GET customer/profile/me
//@desc   get the customer profile of customer loggedin
//@access  Private
//Table Customer_Information
router.get('/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log('Personal Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Customer_Information WHERE Cust_email_id='${customerID}'`,
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
                //console.log(result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
//@route  POST customer/profile/basicdetails/me
//@desc   Update customer basic details
//@access  Private
//Table Customer_Information
router.post(
    '/basicdetails/me', [
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
        const customerID = req.customer.id;
        try {
            var query = `UPDATE Customer_Information set First_Name='${First_Name}', Last_Name='${Last_Name}', Date_of_Birth='${Date_of_Birth}',
            City ='${City}',  State='${State}', Country='${Country}', Nick_Name='${Nick_Name}', Headline='${Headline}' WHERE Cust_email_id='${customerID}'`;
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
//@route  GET customer/profile/basicdetails/me
//@desc   get customer basic details
//@access  Private
//Table Customer_Information
router.get('/basicdetails/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log('Get basicdetails', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Cust_Name, Cust_ProfilePic, First_Name, Last_Name, Date_of_Birth, City, State, Country, Nick_Name, Headline
             FROM Customer_Information WHERE Cust_email_id='${customerID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                //emp.every(_.isNull);
                //words.filter(word => word.length > 6)
                // resultNull = result.filter((value) => value === 'null');
                // if (resultNull.length === 0) {
                //     return res.status(400).json({
                //         errors: [{ msg: 'Customer basic details doesnt Exists' }],
                //     });
                // }
                //console.log(result);
                res.status(200).json(result[0]);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
//@route  POST customer/profile/contactinfo/me
//@desc   Update customer contact details
//@access  Private
//Table Customer_Information
router.post(
    '/contactinfo/me', [
        check('Cust_email_id', 'Email ID is required').not().isEmpty(),
        check('Phone_Number', 'Phone Number is required').not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Cust_email_id, Phone_Number } = req.body;
        const customerID = req.customer.id;
        try {
            var query = `UPDATE Customer_Information set Cust_email_id='${Cust_email_id}', Phone_Number='${Phone_Number}' WHERE Cust_email_id='${customerID}'`;
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
//@route  GET customer/profile/contactinfo/me
//@desc   get customer contact details
//@access  Private
//Table Customer_Information
router.get('/contactinfo/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log(customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Cust_email_id, Phone_Number FROM Customer_Information WHERE Cust_email_id='${customerID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                //emp.every(_.isNull);
                //words.filter(word => word.length > 6)
                resultNull = result.filter((value) => value === 'null');
                if (resultNull.length === 0) {
                    return res.status(400).json({
                        errors: [{ msg: 'Customer contactInfo doesnt Exists' }],
                    });
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
//@route  POST customer/profile/custabout/me
//@desc   Update customer about details
//@access  Private
//Table Customer_Information

router.post('/custabout/me', (req, res) => {
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

//@route  GET customer/profile/custabout/me
//@desc   Update customer about details
//@access  Private
//Table Customer_Information

router.get('/custabout/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log(customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Yelping_Since, Things_I_Love, My_Blog_Or_Website, Find_Me_In, My_Favourite_Movie, Current_Crush
             FROM Customer_Information WHERE Cust_email_id='${customerID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                //emp.every(_.isNull);
                //words.filter(word => word.length > 6)
                resultNull = result.filter((value) => value === 'null');
                if (resultNull.length === 0) {
                    return res.status(400).json({
                        errors: [{ msg: 'Customer About details doesnt Exists' }],
                    });
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

//@route  POST customer/profile/update/me
//@desc   Update/Create all the customer details
//@access  Private
//Table Customer_Information

router.post(
    '/updateprofile/me', [
        check('First_Name', 'First Name is required').not().isEmpty(),
        check('Last_Name', 'Last Name is required').not().isEmpty(),
        check('City', 'City name is required').not().isEmpty(),
        check('Phone_Number', 'Phone Number is required').not().isEmpty(),
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
            Cust_email_id,
            Phone_Number,
            Nick_Name,
            Headline,
            Yelping_Since,
            Things_I_Love,
            My_Blog_Or_Website,
            Find_Me_In,
            My_Favourite_Movie,
            Current_Crush,
        } = req.body;
        //console.log('custProfile', req.params);
        const customerID = Cust_email_id;
        console.log('create profile', customerID);
        try {
            var query = `UPDATE Customer_Information set First_Name='${First_Name}', Last_Name='${Last_Name}', Date_of_Birth='${Date_of_Birth}',
            City ='${City}',  State='${State}', Country='${Country}', Phone_Number='${Phone_Number}', 
            Yelping_Since='${Yelping_Since}', Things_I_Love='${Things_I_Love}', My_Blog_Or_Website='${My_Blog_Or_Website}',
            Find_Me_In='${Find_Me_In}', My_Favourite_Movie='${My_Favourite_Movie}', Current_Crush='${Current_Crush}', 
            Nick_Name='${Nick_Name}', Headline='${Headline}' WHERE Cust_email_id='${customerID}'`;
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
                res.status(200).json(result[0]);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;