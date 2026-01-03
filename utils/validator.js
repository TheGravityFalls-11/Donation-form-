const Joi = require('joi');

class Validator {
  static mobile(mobile) {
    const schema = Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number',
        'any.required': 'Mobile required'
      });
    return schema.validate(mobile);
  }

  static otp(otp) {
    const schema = Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        'string.pattern.base': 'OTP must be 6 digits',
        'any.required': 'OTP required'
      });
    return schema.validate(otp);
  }
}

module.exports = Validator;