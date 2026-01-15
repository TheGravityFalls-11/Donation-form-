const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  
  // Snapshot of data at time of donation
  fullName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    enum: ['Mr', 'Ms', 'Mrs', 'Dr', 'Other'],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  
  // Citizenship - CRITICAL VALIDATION
  isIndianCitizen: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'Only Indian citizens can make donations'
    }
  },
  isResidingInIndia: {
    type: Boolean,
    required: true
  },
  
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  
  // Address at time of donation
  homeAddress: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  assemblyConstituency: {
    type: String,
    required: true
  },
  
  // Payment Details
  paymentMode: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true
  },
  
  amount: {
    type: Number,
    required: true,
    min: [1, 'Amount must be at least ₹1'],
    max: [2000000, 'Amount cannot exceed ₹20,00,000']
  },
  
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  
  transactionId: String,
  transactionDate: Date,
  
  // Receipt
  receiptNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  receiptGenerated: {
    type: Boolean,
    default: false
  },
  
  wants80GUpdates: {
    type: Boolean,
    default: false
  },
  
  // Declaration - MUST BE TRUE
  declarationAccepted: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'Declaration must be accepted'
    }
  },
  
  status: {
    type: String,
    enum: ['Active', 'Cancelled', 'Refunded'],
    default: 'Active'
  },
  
  ipAddress: String,
  userAgent: String
  
}, {
  timestamps: true
});

// REMOVE PRE-SAVE HOOK - Generate receipt manually in controller instead

donationSchema.index({ userId: 1, createdAt: -1 });
donationSchema.index({ profileId: 1 });
donationSchema.index({ receiptNumber: 1 });
donationSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Donation', donationSchema);