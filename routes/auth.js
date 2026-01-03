const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { validateMobile, validateOTP } = require('../middleware/validate');
const { sendLimit, verifyLimit } = require('../utils/limiter');
const { notAuth } = require('../middleware/auth');

// Send OTP
router.post('/send-otp', 
  notAuth,
  sendLimit, 
  validateMobile, 
  authController.sendOTP
);

// Verify OTP
router.post('/verify-otp', 
  notAuth,
  verifyLimit, 
  validateOTP, 
  authController.verifyOTP
);

// Logout
router.post('/logout', authController.logout);

// Check session
router.get('/session', authController.checkSession);

module.exports = router;