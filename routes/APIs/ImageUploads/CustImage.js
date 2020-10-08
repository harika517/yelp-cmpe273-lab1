const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const path = require('path');
const multer = require('multer');

const userstorage = multer.diskStorage({
    destination: `${path.join(__dirname, '..')}/public/uploads/users`,
    filename: (req, file, cb) => {
        cb(
            null,
            `user${req.customer.key}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000 },
}).single('image');

router.post('/', auth, (req, res) => {
    console.log('image upload', req.customer.id);

    const Cust_email_id = req.customer.id;
    useruploads(req, res, function(err) {
        if (!err) {
            let imageSql = `UPDATE Customer_Information SET Cust_ProfilePic = '${req.file.filename}' WHERE Cust_email_id = '${Cust_email_id}'`;
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