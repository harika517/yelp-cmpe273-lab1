const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const path = require('path');
const multer = require('multer');

const userstorage = multer.diskStorage({
    destination: `${path.join(
    __dirname,
    '../../../'
  )}/public/uploads/restaurants`,
    filename: (req, file, cb) => {
        cb(
            null,
            'user_' +
            req.customer.id.replace('@', '_') +
            path.extname(file.originalname)
        );
    },
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000 },
}).single('image');

router.post('/', auth, async(req, res) => {
    // console.log('inside image upload, email id is', req.customer.id);
    // console.log('inside image upload, file name is,', req.image);
    // console.log('inside image upload, Cust_Email,', req.Cust_Email);
    // console.log('inside image upload, file,', req.file);
    // console.log('inside image upload, req is,', req.customer);
    // console.log('inside image upload, res is ', res);

    const Rest_email_id = req.customer.id;
    useruploads(req, res, function(err) {
        if (!err) {
            let imageSql = `UPDATE Restaurant_Information SET Rest_ProfilePic = '${req.file.filename}' WHERE Rest_email_id = '${Rest_email_id}'`;
            try {
                mysqlConnectionPool.query(imageSql, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Database Error');
                    }
                    res.status(200).json(result);
                });
            } catch (error) {
                console.log(error);
                res.status(500).send('Server Error');
            }
        } else {
            console.log('Image upload Error!');
        }
    });
});

module.exports = router;