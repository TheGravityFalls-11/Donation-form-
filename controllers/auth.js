const User = require('../models/User');
const OTP = require('../models/OTP');
const OTPGenerator = require('../utils/otp');
const sms = require('../config/sms');

class AuthController {
  async sendOTP(req, res) {
    try {
      const { mobile } = req.body;

      // Delete old OTP
      await OTP.deleteMany({ mobile });

      // Generate OTP
      const otpCode = OTPGenerator.generate(6);
      const expiresAt = OTPGenerator.getExpiry(
        parseInt(process.env.OTP_EXPIRY_MINUTES) || 10
      );

      // Save OTP
      const otpRecord = new OTP({ mobile, expiresAt });
      await otpRecord.hashOTP(otpCode);
      await otpRecord.save();

      // SKIP SMS SENDING FOR TESTING
      // const result = await sms.sendOTP(mobile, otpCode);
      // if (!result.success) {
      //   await OTP.deleteOne({ _id: otpRecord._id });
      //   return res.status(500).json({
      //     success: false,
      //     message: result.message
      //   });
      // }

      // Dev mode - log OTP
      console.log(`📱 OTP for ${mobile}: ${otpCode}`);

      res.json({
        success: true,
        message: 'OTP sent successfully',
        otp: otpCode, // Include OTP in response for testing
        expiresIn: process.env.OTP_EXPIRY_MINUTES || 10
      });

    } catch (error) {
      console.error('Send OTP Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP'
      });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { mobile, otp } = req.body;

      // Find OTP
      const otpRecord = await OTP.findOne({ 
        mobile,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          message: 'OTP expired or not found'
        });
      }

      // Check attempts
      const maxAttempts = parseInt(process.env.MAX_OTP_ATTEMPTS) || 5;
      if (otpRecord.attempts >= maxAttempts) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return res.status(429).json({
          success: false,
          message: 'Max attempts exceeded'
        });
      }

      // Verify OTP
      const isValid = await otpRecord.verifyOTP(otp);
      if (!isValid) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        return res.status(400).json({
          success: false,
          message: `Invalid OTP. ${maxAttempts - otpRecord.attempts} attempts left`
        });
      }

      // Find or create user
      let user = await User.findOne({ mobile });
      if (!user) {
        user = new User({ mobile });
      }
      user.lastLogin = new Date();
      await user.save();

      // Delete OTP
      await OTP.deleteOne({ _id: otpRecord._id });

      // Create session
      req.session.userId = user._id;
      req.session.mobile = user.mobile;

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          mobile: user.mobile,
          lastLogin: user.lastLogin
        }
      });

    } catch (error) {
      console.error('Verify OTP Error:', error);
      res.status(500).json({
        success: false,
        message: 'Verification failed'
      });
    }
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Logout failed'
        });
      }
      res.clearCookie('session_id');
      res.json({
        success: true,
        message: 'Logged out'
      });
    });
  }

  async checkSession(req, res) {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      return res.json({
        success: true,
        authenticated: true,
        user: {
          mobile: user.mobile,
          lastLogin: user.lastLogin
        }
      });
    }
    res.json({
      success: true,
      authenticated: false
    });
  }
}

module.exports = new AuthController();