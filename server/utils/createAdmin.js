const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const createAdminAccount = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arya_blooms';
    await mongoose.connect(connStr);

    const email = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@aryablooms.com';
    const password = process.env.ADMIN_PASSWORD || process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Arya (Owner)';

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      console.log(`[Admin Setup] Admin with email ${email} already exists.`);
      process.exit(0);
    }

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin'
    });

    console.log(`\n========================================`);
    console.log(`[Admin Account Successfully Created]`);
    console.log(`Name:     ${admin.name}`);
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log(`========================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('[Create Admin Error]:', error.message);
    process.exit(1);
  }
};

createAdminAccount();
