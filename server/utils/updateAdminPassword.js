const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const updatePassword = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arya_blooms';
    await mongoose.connect(connStr);
    console.log('[Update Admin] Connected to MongoDB');

    const email = 'admin@aryablooms.com';
    const newPassword = 'aryaisanidiot';

    let admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      admin = new Admin({
        name: 'Arya (Owner)',
        email: email.toLowerCase(),
        password: newPassword,
        role: 'admin'
      });
    } else {
      admin.password = newPassword;
    }

    await admin.save();
    console.log(`\n========================================`);
    console.log(`[Admin Password Successfully Updated]`);
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${newPassword}`);
    console.log(`========================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('[Update Admin Password Error]:', error.message);
    process.exit(1);
  }
};

updatePassword();
