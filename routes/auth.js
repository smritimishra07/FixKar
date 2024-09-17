const express = require('express');
const router = express.Router();
const {createProfile, updateProfile, deleteProfile} = require('../Controllers/authController');



router.post('/createProfile', createProfile); // Create profile
router.patch('/updateProfile/:id', updateProfile); // Update profile
router.delete('/deleteProfile/:id', deleteProfile); // Delete profile

module.exports = router;