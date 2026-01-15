const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Personal Details
  title: {
    type: String,
    enum: ['Mr', 'Ms', 'Mrs', 'Dr', 'Other'],
    default: 'Mr'
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  
  // Address Details
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  district: {
    type: String,
    required: [true, 'District is required']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
  },
  assemblyConstituency: {
    type: String,
    required: [true, 'Assembly constituency is required']
  },
  
  // Profile Status
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  
  wantsUpdates: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

// REMOVE THE PRE-SAVE HOOK ENTIRELY - Calculate on the fly instead
// profileSchema.pre('save', function(next) { ... }); // DELETE THIS

// Add a virtual or method instead
profileSchema.methods.calculateCompletion = function() {
  const requiredFields = [
    'fullName', 'email', 'mobileNumber', 'dateOfBirth', 
    'gender', 'address', 'state', 'district', 'pincode', 
    'assemblyConstituency'
  ];
  
  const filledFields = requiredFields.filter(field => this[field]);
  this.isProfileComplete = filledFields.length === requiredFields.length;
};

profileSchema.index({ userId: 1 });
profileSchema.index({ email: 1 });

module.exports = mongoose.model('Profile', profileSchema);