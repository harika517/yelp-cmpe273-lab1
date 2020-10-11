const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const path = require('path');
const multer = require('multer');

const itemstorage = multer.diskStorage({
    destination: `${path.join(__dirname, '../../../')}/public/uploads/dishitems`,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 1000000 },
}).single('image');

router.post('/:item_id', auth, async(req, res) => {
    // console.log('inside image upload, email id is', req.customer.id);
    // console.log('inside image upload, file name is,', req.image);
    // console.log('inside image upload, Cust_Email,', req.Cust_Email);
    // console.log('inside image upload, file,', req.file);
    // console.log('inside image upload, req is,', req.customer);
    // console.log('inside image upload, res is ', res);

    const item_id = req.params.item_id;
    console.log('inside insert item image, item_id is ', item_id);
    console.log('inside insert item image, file is ', req.file);
    itemuploads(req, res, function(err) {
        if (!err) {
            let imageSql = `UPDATE Restaurant_Dishes SET item_image = '${req.file.filename}' WHERE item_id = '${item_id}'`;
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