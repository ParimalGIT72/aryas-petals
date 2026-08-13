const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const CustomRequest = require('../models/CustomRequest');

dotenv.config();

const initialProducts = [
  {
    name: 'Midnight Web',
    description: 'A captivating, dramatic arrangement featuring velvet dark navy blooms, deep plum roses, and dried botanical accents. Handcrafted for evening galas, dark romantic aesthetic lovers, and bold floral statements.',
    price: 1299,
    category: 'Special Occasions',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/midnight-web-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/midnight-web-2'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800',
    colors: ['Midnight Blue', 'Plum', 'Charcoal', 'Gold Accent'],
    occasion: ['Anniversary', 'Gothic Wedding', 'Cocktail Night', 'Special Occasion'],
    featured: true,
    available: true,
    stock: 8,
    customizable: true,
    tags: ['dramatic', 'velvet', 'handmade', 'everlasting', 'signature']
  },
  {
    name: 'Lavender Love',
    description: 'Soft french lavender stems paired with crisp cream roses, delicate statice, and silver dollar eucalyptus. Emits a soothing aesthetic and gentle flower perfume vibe.',
    price: 899,
    category: 'Bouquets',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/lavender-love-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/lavender-love-2'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
    colors: ['Lavender', 'Pastel Purple', 'Cream White', 'Sage Green'],
    occasion: ['Birthday', 'Anniversary', 'Get Well Soon', 'Just Because'],
    featured: true,
    available: true,
    stock: 12,
    customizable: true,
    tags: ['lavender', 'soft', 'romantic', 'bestseller', 'pastel']
  },
  {
    name: 'Blue Daisy',
    description: 'Enchanting sky-blue daisies clustered with delicate baby’s breath and fresh wild greenery. Brings sunny wildflower meadows right into your living space.',
    price: 749,
    category: 'Birthday',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/blue-daisy-1'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800',
    colors: ['Sky Blue', 'Pure White', 'Soft Sage'],
    occasion: ['Birthday', 'Graduation', 'Thank You', 'Cheer Up'],
    featured: true,
    available: true,
    stock: 15,
    customizable: true,
    tags: ['daisy', 'blue', 'wildflower', 'fresh', 'charming']
  },
  {
    name: 'Blush Garden',
    description: 'An elegant arrangement of multi-layered blush pink garden peonies, ivory ranunculus, and trailing ivy. The ultimate expression of feminine beauty and timeless grace.',
    price: 1099,
    category: 'Anniversary',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/blush-garden-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1494336934202-f068225f6a31?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/blush-garden-2'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
    colors: ['Blush Pink', 'Ivory', 'Rose Gold', 'Soft Green'],
    occasion: ['Anniversary', 'Wedding', 'Bridal Shower', 'Valentine'],
    featured: true,
    available: true,
    stock: 10,
    customizable: true,
    tags: ['peony', 'blush', 'luxurious', 'feminine', 'classic']
  }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arya_blooms';
    await mongoose.connect(connStr);
    console.log('[Seed Script] Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await Order.deleteMany({});
    await CustomRequest.deleteMany({});
    console.log('[Seed Script] Cleared existing collections');

    // Create Initial Admin Account
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aryablooms.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const admin = await Admin.create({
      name: 'Arya (Owner)',
      email: adminEmail.toLowerCase(),
      password: adminPassword,
      role: 'admin'
    });
    console.log(`[Seed Script] Initial Admin Created: ${admin.email} / ${adminPassword}`);

    // Create Initial Seed Products
    for (const prodData of initialProducts) {
      prodData.slug = slugify(prodData.name, { lower: true, strict: true });
      await Product.create(prodData);
    }
    console.log(`[Seed Script] Successfully seeded ${initialProducts.length} initial products!`);

    // Create sample Order
    const sampleProduct = await Product.findOne({ name: 'Lavender Love' });
    await Order.create({
      customerName: 'Sophia Reynolds',
      phone: '+91 98765 43210',
      email: 'sophia@example.com',
      product: sampleProduct ? sampleProduct._id : null,
      productName: sampleProduct ? sampleProduct.name : 'Lavender Love',
      quantity: 1,
      totalPrice: sampleProduct ? sampleProduct.price : 899,
      customMessage: 'Happy Birthday Mom! With lots of love.',
      deliveryAddress: '42 Blossom Avenue, Sector 15, New Delhi - 110001',
      status: 'Pending'
    });
    console.log('[Seed Script] Created sample customer order');

    // Create sample Custom Request
    await CustomRequest.create({
      name: 'Elena Rostova',
      phone: '+91 98111 22334',
      email: 'elena@example.com',
      occasion: 'Bridal Shower',
      preferredColors: ['Pastel Pink', 'Cream', 'Eucalyptus Green'],
      budget: 2500,
      description: 'Looking for a table centerpiece with high-rise peonies and rustic twine wrap for a 20-person brunch gathering.',
      status: 'New'
    });
    console.log('[Seed Script] Created sample custom request');

    console.log('\n--- SEED COMPLETE ---');
    console.log(`Admin Login Email: ${admin.email}`);
    console.log(`Admin Password: ${adminPassword}`);
    console.log('---------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Script Error]:', error);
    process.exit(1);
  }
};

seedDB();
