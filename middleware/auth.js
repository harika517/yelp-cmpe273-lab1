const jwt = require('jsonwebtoken');
const config = require('config');

//middlewear
module.exports = function(req, res, next) {
    // Get tiken from the header
    const token = req.header('x-auth-token');
    console.log('This was called');
    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token. Authorization denied' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.customer = decoded.customer;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};