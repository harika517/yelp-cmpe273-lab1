const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mysqlConnectionPool = require('../../config/connectiondbpool');

//@route GET /customer/auth
//@desc  Test route
//@access Public
router.get('/', auth, async(req, res) => {
    const Cust_email_id = req.customer.id;
    console.log(Cust_email_id);
    try {
        mysqlConnectionPool.query(
            `SELECT Cust_Id, Cust_Name, Cust_email_id, Cust_ProfilePic FROM Customer_Information WHERE Cust_email_id = '${Cust_email_id}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Database Server Error');
                }
                // console.log('Here ' + result);
                // console.log(JSON.stringify(result));
                // res.send(JSON.stringify(result));
                res.json(result);
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;