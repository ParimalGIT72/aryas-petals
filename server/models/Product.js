const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Bouquets', 'Birthday', 'Anniversary', 'Customized', 'Special Occasions']
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
      }
    ],
    primaryImage: {
      type: String,
      default: ''
    },
    colors: {
      type: [String],
      default: []
    },
    occasion: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    },
    available: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 1,
      min: 0
    },
    customizable: {
      type: Boolean,
      default: true
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to ensure primaryImage is populated if images exist
productSchema.pre('save', function (next) {
  if (this.images && this.images.length > 0 && !this.primaryImage) {
    this.primaryImage = this.images[0].url;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
