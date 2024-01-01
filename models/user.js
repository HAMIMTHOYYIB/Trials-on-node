const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing

const User = require('../models/user'); // Assuming the User model file path

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send('User already exists'); // Handle this case appropriately
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // Any other fields you might have in the User schema
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    res.status(500).send('Login error');
  }
});

module.exports = router;
