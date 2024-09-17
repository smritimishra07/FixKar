const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.createProfile = async (req, res) => {
  const { name, email, phone, address, profilePhoto } = req.body;

  // Validate required fields
  if (!name || !phone || !address) {
    return res.status(400).json({ message: 'Name, phone number, and address are required.' });
  }

  try {
    // Create new profile
    const provider = new User({ // Assuming you're using User model for service providers
      name,
      email,
      phone,
      address,
      profilePhoto
    });

    // Save user to database
    await provider.save();

    res.status(201).json({
      message: 'Profile created successfully!',
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        profilePhoto: provider.profilePhoto
      }
    });
  } catch (err) {
    console.error('Error creating profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Service Provider Profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const { name, email, phone, address, profilePhoto } = req.body; // Get data from request body

  try {
    // Find the service provider by ID
    let provider = await User.findById(id);
    
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    // Update fields if provided
    if (name !== undefined) provider.name = name; // Check for undefined explicitly
    if (email !== undefined) provider.email = email; // Check for undefined explicitly
    if (phone !== undefined) provider.phone = phone; // Check for undefined explicitly
    if (address !== undefined) provider.address = address; // Check for undefined explicitly
    if (profilePhoto !== undefined) provider.profilePhoto = profilePhoto; // Check for undefined explicitly

    await provider.save(); // Save updated user

    res.status(200).json({
      message: 'Profile updated successfully',
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        profilePhoto: provider.profilePhoto
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Delete Service Provider Profile
exports.deleteProfile = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters

  try {
    // Find the service provider by ID
    let provider = await User.findById(id);
    
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    // Delete the service provider
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};