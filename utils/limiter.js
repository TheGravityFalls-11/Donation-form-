const rateLimit = require('express-rate-limit');

const sendLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many requests. Try after 15 minutes'
  }
});

const verifyLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many attempts. Try later'
  }
});

module.exports = { sendLimit, verifyLimit };