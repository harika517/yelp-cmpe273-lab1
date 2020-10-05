const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const auth = require('../../../middleware/auth');

//@route  GET (get all events) '/customer/events'
//@desc   view all events by customers
//@access  Private
//Table Events
//Customer  Action

router.get('/', (req, res) => {
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM Events ORDER BY Event_Date ASC`,
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
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  POST (Post events by restaurant ) 'restsaurant/events/me'
//@desc   Creating an event
//@access  Private
//Table Events
//Restaurant Action
router.post(
    '/me',
    auth, [
        check('Event_Name', 'Event title is required').not().isEmpty(),
        check('Event_Date', 'Date of the event is required').not().isEmpty(),
        check('Event_Time', 'Please mention Time').not().isEmpty(),
        check('Event_Location', 'Please include Venue details').not().isEmpty(),
        check('Rest_Name', 'Please include Venue details').not().isEmpty(),
        check('Rest_email_id', 'Please include emailId').not().isEmpty(),
    ],
    (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            Rest_Name,
            Rest_email_id,
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
                    Hashtags, What_And_Why, Rest_Name, Rest_email_id ) VALUES ('${Event_Name}', '${Event_Date}', '${Event_Time}', 
                    '${Event_Location}', '${Hashtags}', '${What_And_Why}', '${Rest_Name}', '${Rest_email_id}')`,
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

//@route  POST (Update events by me ) 'restaurant/events/update/me'
//@desc   Updating an event
//@access  Private
//Table Events
//Restaurant Action
//hanging request in postman ......
router.post('/updateevent/:Event_Id', auth, async(req, res) => {
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
        Rest_Name,
        Rest_email_id,
    } = req.body;
    // const Event_Name = req.customer.id;
    // console.log('Event Name: ', customerID);
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `UPDATE Events set Event_Name = '${Event_Name}', Event_Date ='${Event_Date}', 
            Event_Time='${Event_Time}', Event_Location='${Event_Location}', Hashtags='${Hashtags}', 
            What_And_Why= '${What_And_Why}', Rest_Name='${Rest_Name}', Rest_email_id='${Rest_email_id}'
            WHERE Event_Id='${Event_Id}'`,
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

//@route  GET (events created by me) '/events/me
//@desc   view the events created by me(Restaurant)
//@access  Private
//Table Events
//Restaurant Action

router.get('/me', auth, (req, res) => {
    const customerID = req.customer.id;
    console.log('get rest events', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT
            Event_Id,
            Event_Name,
            Event_Date,
            Event_Time,
            Event_Location,
            Hashtags,
            What_And_Why,
            Rest_Name,
            Rest_email_id
          FROM
            Events
          WHERE
          Rest_email_id='${customerID}' ORDER BY Event_Date ASC`,
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
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  GET (event detail by name) '/customer/events/eventdetail
//@desc   view the events created by me(Restaurant)
//@access  Private
//Table Events
//Restaurant Action

router.get('/eventdetail/:Event_Name', auth, (req, res) => {
    const Event_Name = req.params.Event_Name;
    console.log('Event Detail', Event_Name);
    try {
        mysqlConnectionPool.query(
            `SELECT
            Event_Id,
            Event_Name,
            Event_Date,
            Event_Time,
            Event_Location,
            Hashtags,
            What_And_Why,
            Rest_Name,
            Rest_email_id
          FROM
            Events
          WHERE
          Event_Name='${Event_Name}' ORDER BY Event_Date`,
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
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;