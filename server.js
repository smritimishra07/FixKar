// Import required dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Middleware to handle JSON requests
app.use(express.json({ extended: false }));

// Enable CORS to allow requests from React Native app
app.use(cors());

// Define your API routes
app.use('/api/auth', require('./routes/auth'));          // Authentication routes (login, register)
app.use('/api/services', require('./routes/service'));    // Service-related routes

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 6000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});