const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../auth');

//@route  POST (Post events by restaurant ) '/events/me'
//@desc   Creating an event
//@access  Private
//Table Events

router.post(
    '/me',
    auth, [
        check('Event_Name', 'Event title is required').not().isEmpty(),
        check('Event_Date', 'Date of the event is required').not().isEmpty(),
        check('Event_Time', 'Please mention Time').not().isEmpty(),
        check('Event_Location', 'Please include Venue details').not().isEmpty(),
        check('Rest_Name', 'Please include Venue details').not().isEmpty(),
    ],
    (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            Rest_Name,
            Event_Name,
            Event_Date,
            Event_Time,
            Event_Location,
            Hashtags,
            What_And_Why,
        } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `INSERT into Events (Event_Name,
                    Event_Date,
                    Event_Time,
                    Event_Location,
                    Hashtags, What_And_Why,Rest_Name) VALUES ('${Event_Name}', '${Event_Date}', '${Event_Time}', 
                    '${Event_Location}', '${Hashtags}', '${What_And_Why}', '${Rest_Name}')`,
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length > 0) {
                        return res.status(400).json({
                            errors: [{ msg: 'Restaurant Information Already Exists' }],
                        });
                    }
                    res.status(200).json({ result });
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

//@route  POST (Update events by me ) '/events/update/me'
//@desc   Updating an event
//@access  Private
//Table Events

router.post('/update/me', auth, async(req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        Event_Name,
        Event_Date,
        Event_Time,
        Event_Location,
        Hashtags,
        What_And_Why,
    } = req.body;
    const eventID = req.body.Event_Name;
    console.log('Event Name: ', eventID);
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `UPDATE Events set Event_Name = '${Event_Name}', Event_Date ='${Event_Date}', 
            Event_Time='${Event_Time}', Event_Location='${Event_Location}', Hashtags='${Hashtags}', 
            What_And_Why= '${What_And_Why}'
            WHERE Event_Name='${eventID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res.status(400).json({
                        errors: [{ msg: 'Event Doesnt Exists' }],
                    });
                }
                res.status(200).json({ result });
            }
        );
        //res.send('Customer Registered');
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    //return jsonwebtoken
});

//@route  GET (get all events) '/events/viewevents'
//@desc   view all events by customers
//@access  Private
//Table Events

router.get('/', (req, res) => {
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

//@route  GET (events created by me) '/events/me
//@desc   view the events created by me
//@access  Private
//Table Events

router.get('/:Rest_Name', (req, res) => {
    const Rest_Name = req.params.Rest_Name;
    console.log('get rest events', Rest_Name);
    try {
        mysqlConnectionPool.query(
            `SELECT
            Event_Name,
            Event_Date,
            Event_Time,
            Event_Location,
            Hashtags,
            What_And_Why
          FROM
            Events
          WHERE
        Events.Rest_Name='${Rest_Name}'`,
            (error, result) => {
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
                res.status(200).json(result[0]);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;