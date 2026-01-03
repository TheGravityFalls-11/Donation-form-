const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
    index: true
  },
  otpHash: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

otpSchema.methods.hashOTP = async function(otp) {
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(otp.toString(), salt);
};

otpSchema.methods.verifyOTP = async function(otp) {
  return await bcrypt.compare(otp.toString(), this.otpHash);
};

module.exports = mongoose.model('OTP', otpSchema);