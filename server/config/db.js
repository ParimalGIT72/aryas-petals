const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arya_blooms';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);

    // Auto-seed Admin user on startup if no admin exists in DB
    const Admin = require('../models/Admin');
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = (process.env.ADMIN_EMAIL || 'admin@aryablooms.com').toLowerCase();
      const password = process.env.ADMIN_PASSWORD || 'aryaisanidiot';
      await Admin.create({
        name: 'Arya (Owner)',
        email,
        password,
        role: 'admin'
      });
      console.log(`[MongoDB Auto-Setup] Default Admin User Created: ${email}`);
    }

    // Auto-seed initial products if DB is empty
    const Product = require('../models/Product');
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const initialProducts = [
        {
          name: 'Midnight Web',
          slug: 'midnight-web',
          description: 'A captivating, dramatic arrangement featuring velvet dark navy blooms, deep plum roses, and dried botanical accents.',
          price: 1299,
          category: 'Special Occasions',
          images: [{ url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', publicId: 'arya-blooms/midnight-web-1' }],
          primaryImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800',
          colors: ['Midnight Blue', 'Plum', 'Charcoal'],
          occasion: ['Anniversary', 'Special Occasion'],
          featured: true,
          available: true,
          stock: 8,
          customizable: true,
          tags: ['dramatic', 'velvet', 'signature']
        },
        {
          name: 'Lavender Love',
          slug: 'lavender-love',
          description: 'Soft french lavender stems paired with crisp cream roses, delicate statice, and silver dollar eucalyptus.',
          price: 899,
          category: 'Bouquets',
          images: [{ url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800', publicId: 'arya-blooms/lavender-love-1' }],
          primaryImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
          colors: ['Lavender', 'Pastel Purple', 'Cream White'],
          occasion: ['Birthday', 'Anniversary'],
          featured: true,
          available: true,
          stock: 12,
          customizable: true,
          tags: ['lavender', 'bestseller']
        },
        {
          name: 'Blue Daisy',
          slug: 'blue-daisy',
          description: 'Enchanting sky-blue daisies clustered with delicate baby’s breath and fresh wild greenery.',
          price: 749,
          category: 'Birthday',
          images: [{ url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800', publicId: 'arya-blooms/blue-daisy-1' }],
          primaryImage: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800',
          colors: ['Sky Blue', 'Pure White'],
          occasion: ['Birthday', 'Graduation'],
          featured: true,
          available: true,
          stock: 15,
          customizable: true,
          tags: ['daisy', 'wildflower']
        },
        {
          name: 'Blush Garden',
          slug: 'blush-garden',
          description: 'An elegant arrangement of multi-layered blush pink garden peonies, ivory ranunculus, and trailing ivy.',
          price: 1099,
          category: 'Anniversary',
          images: [{ url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800', publicId: 'arya-blooms/blush-garden-1' }],
          primaryImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
          colors: ['Blush Pink', 'Ivory'],
          occasion: ['Anniversary', 'Wedding'],
          featured: true,
          available: true,
          stock: 10,
          customizable: true,
          tags: ['peony', 'blush', 'feminine']
        }
      ];
      await Product.insertMany(initialProducts);
      console.log(`[MongoDB Auto-Setup] Initial Products Seeded`);
    }

  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    console.warn(`[MongoDB Warning] Continuing server startup.`);
  }
};

module.exports = connectDB;
