const mongoose = require('mongoose');

// MongoDB connection string from .env file
const MONGODB_URI = 'mongodb+srv://WestCoastCollegeAdmin:WCC26@cluster0.sm99qsu.mongodb.net/wcc-admin?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get the Admin model
const Admin = require('./models/Admin');

async function checkAccounts() {
  try {
    console.log('Checking all accounts...');
    
    // Find all accounts
    const allAccounts = await Admin.find({});
    
    console.log(`Total accounts found: ${allAccounts.length}`);
    
    for (const account of allAccounts) {
      console.log(`Account: ${account.username}`);
      console.log(`  - accountType: ${account.accountType}`);
      console.log(`  - displayName: ${account.displayName}`);
      console.log(`  - createdAt: ${account.createdAt}`);
      console.log(`  - Has accountType field: ${!!account.accountType}`);
    }
    
  } catch (error) {
    console.error('Error checking accounts:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkAccounts();
