const mongoose = require('mongoose');

const customRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
    occasion: {
      type: String,
      default: 'General'
    },
    preferredColors: {
      type: [String],
      default: []
    },
    budget: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ''
    },
    referenceImages: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Rejected'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CustomRequest', customRequestSchema);
