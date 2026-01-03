const crypto = require('crypto');

class OTPGenerator {
  static generate(length = 6) {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += crypto.randomInt(0, 10);
    }
    return otp;
  }

  static getExpiry(minutes = 10) {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}

module.exports = OTPGenerator;