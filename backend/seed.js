require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Official = require('./src/api/models/official');

// --- Connect to DB ---
connectDB();

const importData = async () => {
  try {
    // Clear any existing officials
    await Official.deleteMany();

    // --- YOUR ADMIN ACCOUNT ---
    const adminUser = new Official({
      name: 'Admin Official', // <-- ADDED NAME
      email: 'official@demo.com',
      password: 'Official@123', // The model will hash this automatically
    });

    await adminUser.save();

    console.log('Admin user created successfully!');
    console.log('Name: Admin Official');
    console.log('Email: official@demo.com');
    console.log('Password: Official@123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();