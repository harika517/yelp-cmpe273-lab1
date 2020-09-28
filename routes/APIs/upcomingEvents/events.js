const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../auth');

//@route  POST (Post events by restaurant ) '/restaurant/events'
//@desc   Posting restaurant events
//@access  Private
//Table Restaurant_Events

router.post(
    '/me',
    auth, [
        check('Event_Title', 'Event title is required').not().isEmpty(),
        check('Event_Description', 'Description id required').not().isEmpty(),
        check('Event_Date', 'Please mention Date').not().isEmpty(),
        check('Event_Timings', 'Please include event timings').not().isEmpty(),
        check('RegistrationClosesBy', 'Please include event timings')
        .not()
        .isEmpty(),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            Event_Title,
            Event_Description,
            Event_Date,
            Event_Day,
            Event_Timings,
            Event_Thumbnail,
            RegistrationClosesBy,
        } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `INSERT into Events (Event_Title, Event_Description, Event_Date, Event_Day, Event_Timings, Event_Thubnail,
                    RegistrationClosesBy) VALUES ('${Event_Title}', '${Event_Description}', '${Event_Date}', 
                    '${Event_Day}', '${Event_Timings}', '${Event_Thumbnail}', '${RegistrationClosesBy}')`,
                async(error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length > 0) {
                        return res.status(400).json({
                            errors: [{ msg: 'Restaurant Information Already Exists' }],
                        });
                    }
                }
            );
            //res.send('Customer Registered');
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        //return jsonwebtoken
    }
);

router.post('/update/me', auth, async(req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        Event_Title,
        Event_Description,
        Event_Date,
        Event_Day,
        Event_Timings,
        Event_Thumbnail,
        RegistrationClosesBy,
    } = req.body;
    const eventID = req.body.Event_Title;
    console.log('Event Name: ', eventID);
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `UPDATE Events set Event_Title = '${Event_Title}', Event_Description ='${Event_Description}', 
            Event_Date='${Event_Date}', Event_Day='${Event_Day}', Event_Timings='${Event_Timings}', 
            Event_Thumbnail='${Event_Thumbnail}',RegistrationClosesBy= '${RegistrationClosesBy}' 
            WHERE Event_Title='${eventID}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res.status(400).json({
                        errors: [{ msg: 'Event Doesnt Exists' }],
                    });
                }
            }
        );
        //res.send('Customer Registered');
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    //return jsonwebtoken
});

router.get('/viewevents', (req, res) => {
    try {
        mysqlConnectionPool.query(`SELECT * FROM Events`, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }
            if (result.length === 0) {
                return res.status(400).json({
                    errors: [{ msg: 'No events scheduled' }],
                });
            }
            //console.log(result);
            res.status(200).json({ result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;