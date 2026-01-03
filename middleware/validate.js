const Validator = require('../utils/validator');

const validateMobile = (req, res, next) => {
  const { mobile } = req.body;
  const { error } = Validator.mobile(mobile);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateOTP = (req, res, next) => {
  const { mobile, otp } = req.body;
  
  const mobileCheck = Validator.mobile(mobile);
  if (mobileCheck.error) {
    return res.status(400).json({
      success: false,
      message: mobileCheck.error.details[0].message
    });
  }
  
  const otpCheck = Validator.otp(otp);
  if (otpCheck.error) {
    return res.status(400).json({
      success: false,
      message: otpCheck.error.details[0].message
    });
  }
  
  next();
};

module.exports = { validateMobile, validateOTP };