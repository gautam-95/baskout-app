const jwt  = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.secret);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (err) {
        res.status(401).json({
            message: 'User is not authenticated!'
        });
    }
};