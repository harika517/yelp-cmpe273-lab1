const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');

//@route POST Customer Profile Pic /customer/addphoto/:Cust_email_id
//@desc   enables user to upload pic
//@access  Private
//Table Customer_Images

router.post(
    '/',
    auth, [check('Cust_Images', 'Upload image').not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Cust_Images } = req.body;
        //console.log('custProfile', req.params);
        const customerID = Cust_email_id;
        try {
            var query = `INSERT into Customer_Images (Cust_email_id, Cust_Images) VALUES ('${customerID}', '${Cust_Images}')`;
            mysqlConnectionPool.query(query, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
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