const express = require('express');
const router = express.Router();
const {
  getProfile,
  createOrUpdateProfile,
  checkProfileCompletion
} = require('../controllers/profile');

const { isAuth } = require('../middleware/auth');

// All routes require authentication
router.get('/', isAuth, getProfile);
router.post('/', isAuth, createOrUpdateProfile);
router.put('/', isAuth, createOrUpdateProfile);
router.get('/status', isAuth, checkProfileCompletion);

module.exports = router;