const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route  GET restaurant/profile/me
//@desc   get the restaurant profile of loggedin
//@access  Private
//Table Restaurant_Information
router.get('/me', auth, async(req, res) => {
    const customerID = req.customer.id;
    console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Rest_Name,Rest_email_id, Rest_location, Description, Contact, Timings, Curbside_PickUp, Dine_In, Yelp_Delivery  
            FROM Restaurant_Information WHERE Rest_email_id='${customerID}'`,
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
                console.log('Restaurant get/me:', result);
                res.status(200).json(result[0]);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  POST restaurant/profile/updateprofile/me
//@desc   Update/Create all the Restaurant details
//@access  Private
//Table Restaurant_Information

//edit profie button
router.post(
    '/updateprofile/me', [
        check('Rest_Name', 'Name is required').not().isEmpty(),
        check('Rest_email_id', 'Email Id is required').not().isEmpty(),
        check('Contact', 'Phone Number is required').not().isEmpty(),
        check('Timings', 'Timings is required').not().isEmpty(),
        check('Curbside_PickUp', 'Mention if this mode of delivery exists')
        .not()
        .isEmpty(),
        check('Dine_In', 'Mention if this mode of delivery exists').not().isEmpty(),
        check('Yelp_Delivery', 'Mention if this mode of delivery exists')
        .not()
        .isEmpty(),
    ],
    auth,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            Rest_Name,
            Rest_email_id,
            Contact,
            Rest_location,
            Description,
            Timings,
            Curbside_PickUp,
            Dine_In,
            Yelp_Delivery,
        } = req.body;
        //console.log('custProfile', req.params);
        const customerID = Rest_email_id;
        console.log('Create Rest profile', customerID);
        try {
            var query = `UPDATE Restaurant_Information set Rest_Name='${Rest_Name}', Rest_email_id='${Rest_email_id}', 
        Rest_location='${Rest_location}', Description='${Description}', Contact='${Contact}', Timings='${Timings}', 
        Curbside_PickUp='${Curbside_PickUp}', Dine_In='${Dine_In}', Yelp_Delivery='${Yelp_Delivery}' 
        WHERE Rest_email_id='${customerID}'`;
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
    }
);

//@route  GET restaurant/profile/
//@desc   get all the restaurant details
//@access  Private
//Table Restaurant_Information

router.get('/', auth, async(req, res) => {
    // const customerID = req.customer.id;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Rest_Name,Rest_email_id, Rest_location, Description, Contact, Timings, Curbside_PickUp, Dine_In, Yelp_Delivery  
            FROM Restaurant_Information`,
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
                // console.log('Restaurant get/me:', result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//@route  GET restaurant/profile/
//@desc   get all the restaurant details
//@access  Private
//Table Restaurant_Information

router.get('/:Rest_Name', async(req, res) => {
    const Rest_Name = req.params.Rest_Name;
    // console.log('Restaurant Profile', customerID);
    try {
        mysqlConnectionPool.query(
            `SELECT Rest_Name,Rest_email_id, Rest_location, Description, Contact, Timings, Curbside_PickUp, Dine_In, Yelp_Delivery  
            FROM Restaurant_Information WHERE Rest_Name='${Rest_Name}'`,
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
                // console.log('Restaurant get/me:', result);
                res.status(200).json({ result });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
// //@route  POST (Inerting profile) /restaurant/profile
// //@desc   inserting profile of particular restaurant
// //@access  Private
// //Table Restaurant_Profile

// //success
// // router.post(
// //     '/', [
// //         check('Rest_Name', 'Restaurant Name is required').not().isEmpty(),
// //         check('Location', 'Restaurant description is required').not().isEmpty(),
// //         check('Description', 'Restaurant Category is required').not().isEmpty(),
// //         check('Contact', 'Restaurant Ingredients is required').not().isEmpty(),
// //         check('Timings', 'Restaurant price is required').not().isEmpty(),
// //         check('Image', 'Restaurant image is required').not().isEmpty(),
// //     ],
// //     (req, res) => {
// //         const errors = validationResult(req);
// //         if (!errors.isEmpty()) {
// //             return res.status(400).json({ errors: errors.array() });
// //         }
// //         const {
// //             Rest_Name,
// //             Location,
// //             Description,
// //             Contact,
// //             Timings,
// //             Image,
// //         } = req.body;
// //         try {
// //             mysqlConnectionPool.query(
// //                 `INSERT into Restaurant_Profile (Rest_Name, Location, Description, Contact, Timings, Image) VALUES ('${Rest_Name}', '${Location}',
// //             '${Description}', '${Contact}', '${Timings}', '${Image}')`,
// //                 (error, result) => {
// //                     if (error) {
// //                         console.log(error);
// //                         return res.status(500).send('Server Error');
// //                     }
// //                     console.log(result);
// //                     res.status(200).json({ result });
// //                 }
// //             );
// //         } catch (error) {
// //             console.log(error);
// //             res.status(500).send('Server Error');
// //         }
// //     }
// // );

// //@route  GET (view profile) /restaurant/profile
// //@desc   get profile of particular restaurant based on rest_id from signup form
// //@access  Private
// //Table Restaurant_Profile

// //1.Checking this .... Success

// router.get('/:Rest_Id_signup', (req, res) => {
//     const restaurantID = req.params.Rest_Id_signup;
//     try {
//         mysqlConnectionPool.query(
//             `SELECT Restaurant_Information.Rest_Name, Rest_email_id, Location, Description,  Contact, Image, item_name, item_image, Timings FROM
//             Restaurant_Information, Restaurant_Profile, Restaurant_Dishes WHERE Restaurant_Information.Rest_Id_signup='${restaurantID}' AND
//             Restaurant_Dishes.rest_id = Restaurant_Profile.rest_id`,
//             (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Server Error');
//                 }
//                 if (result.length === 0) {
//                     return res
//                         .status(400)
//                         .json({ errors: [{ msg: 'Restaurant doesnt Exists' }] });
//                 }
//                 console.log(result);
//                 res.status(200).json({ result });
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

// //@route  POST (Create profile) /restaurant/profile/Rest_Id_signup
// //@desc   Inserting restaurant profile values of restaurant based on Rest_Id_signup from SignUP table
// //@access  Private
// //Table Restaurant_Profile
// //2.Checking this... success
// router.post(
//     '/:Rest_Id_signup', [
//         check('Rest_Name', 'Restaurant Name is required').not().isEmpty(),
//         check('Location', 'Restaurant Location is required').not().isEmpty(),
//         check('Contact', 'Restaurant Contact is required').not().isEmpty(),
//         check('Timings', 'Restaurant timings is required').not().isEmpty(),
//     ],
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const {
//             Rest_Name,
//             Location,
//             Description,
//             Contact,
//             Timings,
//             Image,
//         } = req.body;
//         const restaurantID = req.params.Rest_Id_signup;
//         try {
//             var query = `INSERT into Restaurant_Profile (Rest_Name, Location, Description, Contact, Timings, Image, Rest_Id_signup ) VALUES
//             ('${Rest_Name}', '${Location}', '${Description}','${Contact}','${Timings}','${Image}','${restaurantID}')`;
//             mysqlConnectionPool.query(query, (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Server Error');
//                 }
//                 console.log(result);
//                 res.status(200).json({ result });
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// //@route  POST (Add new dish) /restaurant/profile/dishes/:rest_id
// //@desc   Add new dish for particular restaurant based on rest_id
// //@access  Private
// //Table Restaurant_Dishes

// //3. Checking this... success
// router.post(
//     '/dishes/:rest_id', [
//         check('item_name', 'Item Name is required').not().isEmpty(),
//         check('item_description', 'Item description is required').not().isEmpty(),
//         check('item_category', 'Item Category is required').not().isEmpty(),
//         check('item_ingredients', 'Item Ingredients is required').not().isEmpty(),
//         check('item_price', 'Item price is required').not().isEmpty(),
//         check('item_image', 'Item image is required').not().isEmpty(),
//         check('rest_id', 'Restaurant ID is required').not().isEmpty(),
//     ],
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const {
//             item_name,
//             item_description,
//             item_category,
//             item_ingredients,
//             item_price,
//             item_image,
//             rest_id,
//         } = req.body;

//         try {
//             var query = `INSERT into Restaurant_Dishes (rest_id, item_name, item_description, item_category, item_ingredients, item_price,
//                 item_image) VALUES('${rest_id}', '${item_name}', '${item_description}','${item_category}','${item_ingredients}','${item_price}','${item_image}')`;
//             mysqlConnectionPool.query(query, (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Server Error');
//                 }
//                 console.log(result);
//                 res.status(200).json({ result });
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// //@route  POST (Update Restaurant profile) /restaurant/profile/Rest_Id_signup
// //@desc   Update Restaurant profile of particular restaurant based on rest_id from signup table
// //@access  Private
// //Table Restaurant_Profile
// //4. checking this .... Success

// router.post('/update/:Rest_Id_signup', (req, res) => {
//     const restaurantID = req.params.Rest_Id_signup;
//     console.log(restaurantID);
//     const {
//         Rest_Name,
//         Location,
//         Description,
//         Contact,
//         Timings,
//         Image,
//     } = req.body;
//     try {
//         var query = `UPDATE Restaurant_Profile SET Rest_Name='${Rest_Name}', Location='${Location}', Description='${Description}',
//         Contact='${Contact}', Timings='${Timings}', Image='${Image}' WHERE Rest_Id_signup = ${restaurantID}`;
//         mysqlConnectionPool.query(query, (error, result) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).send('Server Error');
//             }
//             if (result.length === 0) {
//                 return res
//                     .status(400)
//                     .json({ errors: [{ msg: 'Restaurent doesnt Exists' }] });
//             }
//             console.log(result);
//             res.status(200).json({ result });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

// //@route  POST (Update Dish images) /restaurant/profile/dishImages/:rest_id
// //@desc   Update dish images of particular restaurant based on rest_id
// //@access  Private
// //Table Restaurant_Dishes
// //6. not working
// router.post('/dishImages/:item_id', (req, res) => {
//     const item_image = req.body;
//     const item_id = req.params.item_id;
//     try {
//         var query = `UPDATE Restaurant_Dishes set item_image='${item_image}' WHERE item_id ='${item_id}'`;
//         mysqlConnectionPool.query(query, (error, result) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).send('Server Error');
//             }
//             if (result.length === 0) {
//                 return res
//                     .status(400)
//                     .json({ errors: [{ msg: 'Item doesnt Exists' }] });
//             }
//             // console.log(result);
//             // res.status(200).json({ result });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

// //@route  POST (Update Contact Information) /restaurant/profile/contact/:rest_id
// //@desc   Update conatct information of particular restaurant based on rest_id
// //@access  Private
// //Table Restaurant_Profile
// //5. Updating contact information -- success
// router.post('/contact/:Rest_Id_signup', (req, res) => {
//     const Contact = req.body.Contact;
//     const restaurantID = req.params.Rest_Id_signup;
//     try {
//         var query = `UPDATE Restaurant_Profile set Contact='${Contact}' WHERE Rest_Id_signup ='${restaurantID}'`;
//         mysqlConnectionPool.query(query, (error, result) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).send('Database Error');
//             }
//             if (result.length === 0) {
//                 return res
//                     .status(400)
//                     .json({ errors: [{ msg: 'Restaurant doesnt Exists' }] });
//             }
//             console.log(result);
//             res.status(200).json({ result });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

// //@route  PUT (Update dish) /restaurant/profile/dishes/:rest_id
// //@desc   Edit dish for particular restaurant based on rest_id
// //@access  Private
// //Table Restaurant_Dishes

// // router.put('/dishes/:rest_id/:item_id', (req, res) => {
// //     const {
// //         item_name,
// //         item_description,
// //         item_category,
// //         item_ingredients,
// //         item_price,
// //         item_image,
// //     } = req.body;
// //     const restaurantID = req.params.rest_id;
// //     const itemID = req.params.item_id;

// //     try {
// //         var query = `UPDATE Restaurant_Dishes set item_name='${item_name}', item_description='${item_description}',item_category='${item_category}',
// //         item_ingredients='${item_ingredients}', item_price='${item_price}', item_image='${item_image}' WHERE rest_id ='${restaurantID}'
// //         AND  item_id ='${itemID}'`;
// //         mysqlConnectionPool.query(query, (error, result) => {
// //             if (error) {
// //                 console.log(error);
// //                 return res.status(500).send('Server Error');
// //             }
// //             if (result.length === 0) {
// //                 return res
// //                     .status(400)
// //                     .json({ errors: [{ msg: 'item doesnt Exist in this restaurant' }] });
// //             }
// //         });
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).send('Server Error');
// //     }
// // });

// //@route  GET (View dish names) /restaurant/dishes/:rest_id
// //@desc   Edit dish for particular restaurant based on rest_id
// //@access  Private
// //Table Restaurant_Dishes
// //7. not working
// //SELECT Rest_Name, item_name FROM Restaurant_Dishes, Restaurant_Profile WHERE
// //Restaurant_Dishes.Rest_Id_signup='${restaurantID}' AND Restaurant_Profile.Rest_Id_signup='${restaurantID}'
// router.get('/dishes/:Rest_Id_signup', (req, res) => {
//     const restaurantID = req.params.Rest_Id_signup;
//     console.log(restaurantID);
//     try {
//         mysqlConnectionPool.query(
//             `SELECT * FROM Restaurant_Dishes WHERE Rest_Id_signup=${restaurantID}`,
//             (error, result) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Database Error');
//                 }
//                 if (result.length === 0) {
//                     return res
//                         .status(400)
//                         .json({ errors: [{ msg: 'Restaurant doesnt Exists' }] });
//                 }
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;