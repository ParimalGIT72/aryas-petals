const Product = require('../models/Product');
const Order = require('../models/Order');
const CustomRequest = require('../models/CustomRequest');

// GET /api/admin/stats (Admin)
const getAdminStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({ available: true });
    const featuredProducts = await Product.countDocuments({ featured: true });
    const totalOrders = await Order.countDocuments();
    const totalCustomRequests = await CustomRequest.countDocuments();

    // Calculate total revenue from non-cancelled orders
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Fetch recent 5 orders and recent 5 custom requests
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const recentCustomRequests = await CustomRequest.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        availableProducts,
        featuredProducts,
        totalOrders,
        totalCustomRequests,
        totalRevenue
      },
      recentOrders,
      recentCustomRequests
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminStats
};
