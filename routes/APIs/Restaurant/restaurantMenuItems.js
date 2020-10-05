const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Post events by restaurant ) '/restaurant/menuitems/me'
//@desc   Creating an event
//@access  Private
//Table Restaurant_Dishes
//Restaurant Action
router.post(
    '/me',
    auth, [
        check('item_name', 'Name of the Item is required').not().isEmpty(),
        check('item_category', 'Category of the item is required').not().isEmpty(),
        check('item_price', 'Cost of item is required').not().isEmpty(),
        check('Rest_Name', 'Please include Restaurant name').not().isEmpty(),
        check('Rest_email_id', 'Please include emailId').not().isEmpty(),
    ],
    (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            item_name,
            item_description,
            item_category,
            item_ingredients,
            item_price,
            Rest_Name,
            Rest_email_id,
        } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `INSERT into Restaurant_Dishes (item_name,
                    item_description,
                    item_category,
                    item_ingredients,
                    item_price, Rest_Name, Rest_email_id ) VALUES ('${item_name}', '${item_description}', '${item_category}', 
                    '${item_ingredients}', '${item_price}', '${Rest_Name}', '${Rest_email_id}')`,
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

//@route  GET restaurant/menuitems/me
//@desc   get the complete menu by restaurant
//@access  Private
//Table Restaurant_Dishes
router.get('/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log('Current Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT item_name,item_description, item_category, item_ingredients, item_price, item_price 
            FROM Restaurant_Dishes WHERE Rest_email_id='${customerID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Restaurant customer doesnt Exists' }] });
                }
                // console.log('Restaurant get/me:', result);
                res.status(200).json(result);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  GET restaurant/menuitems/updateitem/me
//@desc   get the complete menu by restaurant
//@access  Private
//Table Restaurant_Dishes

router.post('/updateitem/me/:item_id', auth, (req, res) => {
    const {
        item_id,
        item_name,
        item_description,
        item_category,
        item_ingredients,
        item_price,
        Rest_Name,
        Rest_email_id,
    } = req.body;
    //console.log('custProfile', req.params);
    const ItemID = req.body.item_id;
    console.log('MenuItem ID', ItemID);
    try {
        var query = `UPDATE Restaurant_Dishes set item_id='${item_id}', item_name='${item_name}', item_description='${item_description}', 
            item_category='${item_category}', item_ingredients='${item_ingredients}', item_price='${item_price}', 
            Rest_Name='${Rest_Name}', Rest_email_id='${Rest_email_id}' WHERE item_id='${ItemID}'`;
        mysqlConnectionPool.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }
            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Restaurant doesnt Exists' }] });
            }
            // console.log(result);
            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  GET restaurant/menuitems/:Rest_Name
//@desc   get the complete menu by restaurant Name
//@access  Private
//Table Restaurant_Dishes

router.get('/:Rest_Name', async(req, res) => {
    const Rest_Name = req.params.Rest_Name;
    // console.log('Current Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT item_name,item_description, item_category, item_ingredients, item_price, item_price, 
            Rest_Name FROM Restaurant_Dishes WHERE Rest_Name='${Rest_Name}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Restaurant customer doesnt Exists' }] });
                }
                // console.log('Restaurant get/me:', result);
                res.status(200).json(result);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
module.exports = router;