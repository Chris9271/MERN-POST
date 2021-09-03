const express = require('express');
const userController = require('../controller/user-controller');
// const {check} = require('express-validator')
const router = express.Router();

// router.post('/sign', [
//     // check username is notEmpty, if not show withMessage content
//     check('username').notEmpty().withMessage("Please enter username"),
//     // check email is normal email address format also is email, if not show withMessage content
//     check('email').normalizeEmail().isEmail().withMessage("Please enter valid email"),
//     // check password length a least 8, if not show withMessage content
//     check('password').isLength({min: 8}).withMessage("Please check password length"),
// ], userController.addUser);
router.post('/sign', userController.addUser);
router.post('/login', userController.userLogin);

module.exports = router;