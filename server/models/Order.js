const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false
    },
    productName: {
      type: String,
      default: 'Custom Bouquet'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    customMessage: {
      type: String,
      default: ''
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery address is required']
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
