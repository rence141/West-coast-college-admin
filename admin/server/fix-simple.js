const mongoose = require('mongoose');

// MongoDB connection string from .env file
const MONGODB_URI = 'mongodb+srv://WestCoastCollegeAdmin:WCC26@cluster0.sm99qsu.mongodb.net/wcc-admin?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get the Admin model
const Admin = require('./models/Admin');

async function fixAccountTypes() {
  try {
    console.log('Starting account type fix...');
    
    // Find all accounts without accountType or with null/undefined accountType
    const accountsToUpdate = await Admin.find({
      $or: [
        { accountType: { $exists: false } },
        { accountType: null },
        { accountType: { $in: [null, undefined] } }
      ]
    });

    if (accountsToUpdate.length === 0) {
      console.log('No accounts need account type fixes.');
      return;
    }

    console.log(`Found ${accountsToUpdate.length} accounts to update:`);

    // Update each account to set accountType based on username or creation date
    for (const account of accountsToUpdate) {
      let accountType = 'admin'; // default to admin
      
      // If username contains 'registrar', set as registrar
      if (account.username && account.username.toLowerCase().includes('registrar')) {
        accountType = 'registrar';
      }
      
      // If username contains 'student', set as student (for future use)
      if (account.username && account.username.toLowerCase().includes('student')) {
        accountType = 'student';
      }
      
      console.log(`Updating ${account.username}: ${account.username} -> accountType: ${accountType}`);
      
      await Admin.updateOne(
        { _id: account._id },
        { $set: { accountType } }
      );
    }

    console.log('Account type fix completed!');
    
  } catch (error) {
    console.error('Error fixing account types:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

fixAccountTypes();
