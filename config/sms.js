const axios = require('axios');

class SMSService {
  constructor() {
    this.apiKey = process.env.FAST2SMS_API_KEY;
    this.baseURL = 'https://www.fast2sms.com/dev/bulkV2';
  }

  async sendOTP(mobile, otp) {
    try {
      // FOR TESTING: Just log OTP, don't send real SMS
      console.log('═══════════════════════════════════');
      console.log('📱 OTP for', mobile, ':', otp);
      console.log('⏰ Valid for 10 minutes');
      console.log('═══════════════════════════════════');
      
      // Simulate successful SMS send
      return { 
        success: true, 
        message: 'OTP sent (logged to console)' 
      };

      /* UNCOMMENT THIS WHEN FAST2SMS IS VERIFIED
      console.log('📤 Sending OTP to:', mobile);
      
      const response = await axios.get(this.baseURL, {
        params: {
          authorization: this.apiKey,
          variables_values: otp,
          route: 'otp',
          numbers: mobile
        }
      });

      console.log('📥 Fast2SMS Response:', response.data);

      if (response.data.return === true) {
        return { success: true, message: 'OTP sent' };
      }
      throw new Error(response.data.message || 'Failed to send OTP');
      */
    } catch (error) {
      console.error('❌ SMS Error:', error.message);
      console.error('❌ Full Error:', error.response?.data || error);
      return { success: false, message: 'Failed to send OTP' };
    }
  }
}

module.exports = new SMSService();