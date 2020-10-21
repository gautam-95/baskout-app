const jwt  = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secret);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    } catch (err) {
        res.status(401).json({
            message: 'User is not authenticated!'
        });
    }
};