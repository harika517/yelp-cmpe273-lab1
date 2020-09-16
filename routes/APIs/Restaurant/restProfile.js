const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  POST (Inerting profile) /restaurant/profile
//@desc   inserting profile of particular restaurant
//@access  Private
//Table Restaurant_Profile

router.post(
    '/', [
        check('Rest_Name', 'Restaurant Name is required').not().isEmpty(),
        check('Location', 'Restaurant description is required').not().isEmpty(),
        check('Description', 'Restaurant Category is required').not().isEmpty(),
        check('Contact', 'Restaurant Ingredients is required').not().isEmpty(),
        check('Timings', 'Restaurant price is required').not().isEmpty(),
        check('Image', 'Restaurant image is required').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            Rest_Name,
            Location,
            Description,
            Contact,
            Timings,
            Image,
        } = req.body;
        try {
            mysqlConnectionPool.query(
                `INSERT into Restaurant_Profile (Rest_Name, Location, Description, Contact, Timings, Image) VALUES ('${Rest_Name}', '${Location}', 
            '${Description}', '${Contact}', '${Timings}', '${Image}')`,
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    console.log(result);
                    res.status(200).json({ result });
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);

//@route  GET (view profile) /restaurant/profile
//@desc   get profile of particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Profile

router.get('/:rest_id', (req, res) => {
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
                console.log(result);
                res.status(200).json({ result });
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
    '/:rest_id', [
        check('Rest_Name', 'Restaurant Name is required').not().isEmpty(),
        check('Location', 'Restaurant Location is required').not().isEmpty(),
        check('Contact', 'Restaurant Contact is required').not().isEmpty(),
        check('Timings', 'Restaurant timings is required').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            Rest_Name,
            Location,
            Description,
            Contact,
            Timings,
            Image,
        } = req.body;
        const restaurantID = req.params.rest_id;
        try {
            var query = `UPDATE Restaurant_Profile set Rest_Name='${Rest_Name}', Location='${Location}', Description='${Description}',
            Contact ='${Contact}',  Timings='${Timings}', Image='${Image}' WHERE rest_id='${restaurantID}'`;
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
                // res.status(200).json({ result });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);

//@route  POST (Update Dish images) /restaurant/profile/dishImages/:rest_id
//@desc   Update dish images of particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Dishes

router.post('/dishImages/:item_id', (req, res) => {
    const item_image = req.body;
    const item_id = req.params.item_id;
    try {
        var query = `UPDATE Restaurant_Dishes set item_image='${item_image}' WHERE item_id ='${item_id}'`;
        mysqlConnectionPool.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }
            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Item doesnt Exists' }] });
            }
            // console.log(result);
            // res.status(200).json({ result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  POST (Update Contact Information) /restaurant/profile/contact/:rest_id
//@desc   Update conatct information of particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Profile

router.post('/contact/:rest_id', (req, res) => {
    const Contact = req.body;
    const restaurantID = req.params.rest_id;
    try {
        var query = `UPDATE Restaurant_Profile set Contact='${Contact}' WHERE item_id ='${restaurantID}'`;
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
            // res.status(200).json({ result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  POST (Add new dish) /restaurant/profile/dishes/:rest_id
//@desc   Add new dish for particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Dishes

router.post(
    '/dishes/:rest_id', [
        check('item_name', 'Item Name is required').not().isEmpty(),
        check('item_description', 'Item description is required').not().isEmpty(),
        check('item_category', 'Item Category is required').not().isEmpty(),
        check('item_ingredients', 'Item Ingredients is required').not().isEmpty(),
        check('item_price', 'Item price is required').not().isEmpty(),
        check('item_image', 'Item image is required').not().isEmpty(),
        check('rest_id', 'Restaurant ID is required').not().isEmpty(),
    ],
    (req, res) => {
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
            item_image,
            rest_id,
        } = req.body;

        try {
            var query = `INSERT into Restaurant_Dishes (rest_id, item_name, item_description, item_category, item_ingredients, item_price,
                item_image) VALUES('${rest_id}', '${item_name}', '${item_description}','${item_category}','${item_ingredients}','${item_price}','${item_image}')`;
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

//@route  PUT (Update dish) /restaurant/profile/dishes/:rest_id
//@desc   Edit dish for particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Dishes

router.put('/dishes/:rest_id/:item_id', (req, res) => {
    const {
        item_name,
        item_description,
        item_category,
        item_ingredients,
        item_price,
        item_image,
    } = req.body;
    const restaurantID = req.params.rest_id;
    const itemID = req.params.item_id;

    try {
        var query = `UPDATE Restaurant_Dishes set item_name='${item_name}', item_description='${item_description}',item_category='${item_category}',
        item_ingredients='${item_ingredients}', item_price='${item_price}', item_image='${item_image}' WHERE rest_id ='${restaurantID}' 
        AND  item_id ='${itemID}'`;
        mysqlConnectionPool.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }
            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'item doesnt Exist in this restaurant' }] });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  GET (View dish names) /restaurant/dishes/:rest_id
//@desc   Edit dish for particular restaurant based on rest_id
//@access  Private
//Table Restaurant_Dishes

router.get('/dishes/:rest_id', (req, res) => {
    const restaurantID = req.params.rest_id;
    try {
        mysqlConnectionPool.query(
            `SELECT Restaurant_Profile.Rest_Name, Restaurant_Dishes.item_name FROM Restaurant_Dishes INNER JOIN Restaurant_Profile ON 
            Restaurant_Dishes.'${restaurantID}' = Restaurant_Profile.'${restaurantID}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result.length === 0) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Restaurant doesnt Exists' }] });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;