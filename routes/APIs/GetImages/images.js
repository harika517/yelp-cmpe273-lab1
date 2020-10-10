// const express = require('express');
// const router = express.Router();
// const mysqlConnectionPool = require('../../../config/connectiondbpool');
// const path = require('path');
// const fs = require('fs');

// router.get('/picdisplay', (req, res) => {
//     var image = `${path.join(__dirname, '..')}/public/uploads/users/${
//     req.params.Cust_ProfilePic
//   }`;
//     if (fs.existsSync(image)) {
//         res.sendFile(image);
//     } else {
//         res.sendFile(
//             `${path.join(__dirname, '..')}/public/uploads/users/userplaceholder.jpg`
//         );
//     }
// });

const express = require('express');
const router = express.Router();
const mysqlConnectionPool = require('../../../config/connectiondbpool');
const path = require('path');
const auth = require('../../../middleware/auth');
const fs = require('fs');

router.get('/user/:Cust_ProfilePic', async(req, res) => {
    console.log(
        'inside get image, req.params.Cust_ProfilePic is',
        req.params.Cust_ProfilePic
    );
    var image = `${path.join(__dirname, '../../../')}/public/uploads/users/${
    req.params.Cust_ProfilePic
  }`;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(
            `${path.join(
        __dirname,
        '../../../'
      )}/public/uploads/users/userplaceholder.jpg`
        );
    }
});

// router.post("/user/:Cust_ProfilePic", async (req, res) => {
//   console.log(
//     "inside post image, req.params.Cust_ProfilePic is",
//     req.params.Cust_ProfilePic
//   );
//   console.log("res is ", res);
//   res.status(200);
// });

module.exports = router;