const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');

const auth = require('./auth');

//public routes
router.post('/auth/login', validator.login, auth.login);
router.post('/auth/register', validator.register, auth.register);
router.post('/auth/send-otp', validator.sendOTP, auth.sendOTP);
router.post('/auth/resend-otp', validator.resendOTP, auth.resendOTP);
router.post('/auth/verify-otp', validator.verifyOTP, auth.verifyOTP);
router.post('/auth/forgotPassword', validator.forgotPassword, auth.forgotPassword);
router.post('/auth/resetPassword', validator.resetPassword, auth.resetPassword);
module.exports = router;
