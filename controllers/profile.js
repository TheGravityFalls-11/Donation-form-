const Profile = require('../models/Profile');
const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.session.userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
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

// Create or update profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {
      title,
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      state,
      district,
      pincode,
      assemblyConstituency,
      wantsUpdates
    } = req.body;

    // Helper function to calculate completion
    const calculateCompletion = (data) => {
      const requiredFields = [
        'fullName', 'email', 'mobileNumber', 'dateOfBirth', 
        'gender', 'address', 'state', 'district', 'pincode', 
        'assemblyConstituency'
      ];
      
      const filledFields = requiredFields.filter(field => data[field]);
      return filledFields.length === requiredFields.length;
    };

    let profile = await Profile.findOne({ userId: req.session.userId });

    if (profile) {
      // Update existing
      profile.title = title || profile.title;
      profile.fullName = fullName || profile.fullName;
      profile.email = email || profile.email;
      profile.mobileNumber = mobileNumber || profile.mobileNumber;
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
      profile.gender = gender || profile.gender;
      profile.address = address || profile.address;
      profile.state = state || profile.state;
      profile.district = district || profile.district;
      profile.pincode = pincode || profile.pincode;
      profile.assemblyConstituency = assemblyConstituency || profile.assemblyConstituency;
      profile.wantsUpdates = wantsUpdates !== undefined ? wantsUpdates : profile.wantsUpdates;

      // Calculate completion manually
      profile.isProfileComplete = calculateCompletion(profile);

      await profile.save();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: profile
      });
    }

    // Calculate completion for new profile
    const profileData = {
      userId: req.session.userId,
      title,
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      state,
      district,
      pincode,
      assemblyConstituency,
      wantsUpdates: wantsUpdates || false,
      isProfileComplete: calculateCompletion({
        fullName, email, mobileNumber, dateOfBirth, 
        gender, address, state, district, pincode, 
        assemblyConstituency
      })
    };

    // Create new
    profile = await Profile.create(profileData);

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    });

  } catch (error) {
    console.error('Error creating/updating profile:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error saving profile',
      error: error.message
    });
  }
};

// Check if profile is complete
exports.checkProfileCompletion = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.session.userId });

    if (!profile) {
      return res.status(200).json({
        success: true,
        isComplete: false,
        message: 'Please complete your profile'
      });
    }

    res.status(200).json({
      success: true,
      isComplete: profile.isProfileComplete,
      message: profile.isProfileComplete ? 'Profile complete' : 'Profile incomplete'
    });

  } catch (error) {
    console.error('Error checking profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking profile',
      error: error.message
    });
  }
};