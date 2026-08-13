const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders (Customer)
const createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, email, productId, quantity, customMessage, deliveryAddress } = req.body;

    if (!customerName || !phone || !email || !deliveryAddress) {
      return res.status(400).json({ success: false, message: 'Please provide customer name, phone, email, and delivery address' });
    }

    let productName = 'Custom Bouquet';
    let totalPrice = 0;
    let productRef = null;

    if (productId) {
      const product = await Product.findById(productId);
      if (product) {
        productRef = product._id;
        productName = product.name;
        totalPrice = product.price * (quantity || 1);
      }
    }

    const order = await Order.create({
      customerName,
      phone,
      email,
      product: productRef,
      productName,
      quantity: quantity ? Number(quantity) : 1,
      totalPrice,
      customMessage: customMessage || '',
      deliveryAddress,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will contact you soon.',
      order
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders (Admin)
const getOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const orders = await Order.find(query).populate('product', 'name price primaryImage category').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id/status (Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/orders/:id (Admin)
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
};
