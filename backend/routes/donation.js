const express = require('express');
const router = express.Router();
const {
  getProfileForDonation,
  createDonation,
  getUserDonations,
  getDonationById,
  downloadReceipt
} = require('../controllers/donation');

const { isAuth } = require('../middleware/auth');

// All routes require authentication
router.get('/profile-data', isAuth, getProfileForDonation);
router.post('/', isAuth, createDonation);
router.get('/', isAuth, getUserDonations);
router.get('/:id', isAuth, getDonationById);
router.get('/:id/receipt', isAuth, downloadReceipt);

module.exports = router;