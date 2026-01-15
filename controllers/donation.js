const Donation = require('../models/Donation');
const Profile = require('../models/Profile');

// Helper function to generate receipt number
const generateReceiptNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Donation.countDocuments({
    createdAt: { 
      $gte: new Date(year, 0, 1), 
      $lt: new Date(year + 1, 0, 1) 
    },
    paymentStatus: 'Completed'
  });
  
  return `BJP-${year}-${String(count + 1).padStart(6, '0')}`;
};

// Get profile data for auto-fill
exports.getProfileForDonation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.session.userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Please complete your profile first',
        redirectTo: '/profile'
      });
    }

    if (!profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all profile fields',
        redirectTo: '/profile'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        title: profile.title,
        fullName: profile.fullName,
        email: profile.email,
        mobileNumber: profile.mobileNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        homeAddress: profile.address,
        state: profile.state,
        district: profile.district,
        pincode: profile.pincode,
        assemblyConstituency: profile.assemblyConstituency
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.session.userId });

    if (!profile || !profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Complete your profile before donating',
        redirectTo: '/profile'
      });
    }

    const {
      fullName,
      title,
      email,
      mobileNumber,
      dateOfBirth,
      isIndianCitizen,
      isResidingInIndia,
      gender,
      homeAddress,
      state,
      district,
      pincode,
      assemblyConstituency,
      paymentMode,
      amount,
      wants80GUpdates,
      declarationAccepted
    } = req.body;

    // CRITICAL: Indian citizen check
    if (!isIndianCitizen) {
      return res.status(400).json({
        success: false,
        message: 'Only Indian citizens can donate',
        errorCode: 'NOT_INDIAN_CITIZEN'
      });
    }

    // CRITICAL: Declaration check
    if (!declarationAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the declaration',
        errorCode: 'DECLARATION_REQUIRED'
      });
    }

    const donationAmount = Number(amount);

    if (donationAmount < 1 || donationAmount > 2000000) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be between ₹1 and ₹20,00,000'
      });
    }

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                      req.connection.remoteAddress || 
                      req.ip;

    // Prepare donation data
    const donationData = {
      userId: req.session.userId,
      profileId: profile._id,
      fullName,
      title,
      email,
      mobileNumber,
      dateOfBirth,
      isIndianCitizen: true,
      isResidingInIndia,
      gender,
      homeAddress,
      state,
      district,
      pincode,
      assemblyConstituency,
      paymentMode,
      amount: donationAmount,
      wants80GUpdates: wants80GUpdates || false,
      declarationAccepted: true,
      ipAddress,
      userAgent: req.headers['user-agent'],
      paymentStatus: paymentMode === 'Offline' ? 'Completed' : 'Pending'
    };

    // Generate receipt for offline payments
    if (paymentMode === 'Offline') {
      donationData.receiptNumber = await generateReceiptNumber();
      donationData.receiptGenerated = true;
      donationData.transactionDate = new Date();
    }

    const donation = await Donation.create(donationData);

    res.status(201).json({
      success: true,
      message: 'Donation created',
      data: {
        donationId: donation._id,
        amount: donation.amount,
        paymentMode: donation.paymentMode,
        paymentStatus: donation.paymentStatus,
        receiptNumber: donation.receiptNumber
      }
    });

  } catch (error) {
    console.error('Error creating donation:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating donation',
      error: error.message
    });
  }
};

// Get user donations
exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });

    const totalAmount = donations
      .filter(d => d.paymentStatus === 'Completed' && d.status === 'Active')
      .reduce((sum, d) => sum + d.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount,
      data: donations.map(d => ({
        id: d._id,
        type: 'Donation',
        paymentMode: d.paymentMode,
        paymentStatus: d.paymentStatus,
        status: d.status,
        date: d.createdAt,
        amount: d.amount,
        receiptNumber: d.receiptNumber || 'N/A'
      }))
    });

  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
};

// Get single donation
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      userId: req.session.userId
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });

  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message
    });
  }
};

// Download receipt
exports.downloadReceipt = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      userId: req.session.userId
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    if (donation.paymentStatus !== 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Receipt only for completed donations'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        receiptNumber: donation.receiptNumber,
        donationId: donation._id,
        amount: donation.amount,
        date: donation.transactionDate || donation.createdAt,
        donorName: donation.fullName
      }
    });

  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating receipt',
      error: error.message
    });
  }
};