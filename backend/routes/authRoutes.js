const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signUp', UserController.signUpUser);
router.post('/login', UserController.loginUser);

module.exports = router;