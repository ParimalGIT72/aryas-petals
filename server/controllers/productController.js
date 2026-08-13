const Product = require('../models/Product');
const slugify = require('slugify');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { category, featured, available, search, sort } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (available !== undefined) {
      query.available = available === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { colors: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { price: 1 };
    if (sort === 'price-high') sortOptions = { price: -1 };
    if (sort === 'popular') sortOptions = { featured: -1, createdAt: -1 };

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/featured
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, available: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/search?q=lavender
const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json({ success: true, count: 0, products: [] });
    }

    const regex = new RegExp(q, 'i');
    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }, { tags: regex }, { colors: regex }, { category: regex }]
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // First try by slug, if not found try by _id
    let product = await Product.findOne({ slug });
    if (!product && slug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slug);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Bloom not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products (Admin)
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      colors,
      occasion,
      featured,
      available,
      stock,
      customizable,
      tags,
      existingImageUrls
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: 'Please provide name, description, price, and category' });
    }

    // Generate unique slug
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const imageObjects = [];

    // Process uploaded files through Cloudinary/DataURL helper
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer, file.mimetype);
        imageObjects.push(uploaded);
      }
    }

    // Process any JSON passed existing images / fallback image URLs
    if (existingImageUrls) {
      const parsedUrls = typeof existingImageUrls === 'string' ? JSON.parse(existingImageUrls) : existingImageUrls;
      if (Array.isArray(parsedUrls)) {
        parsedUrls.forEach((img, idx) => {
          if (typeof img === 'string') {
            imageObjects.push({ url: img, publicId: `arya-blooms/preset-${idx}-${Date.now()}` });
          } else if (img.url) {
            imageObjects.push(img);
          }
        });
      }
    }

    // Fallback placeholder image if no images uploaded
    if (imageObjects.length === 0) {
      imageObjects.push({
        url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
        publicId: 'arya-blooms/default-bloom'
      });
    }

    const parseArrayField = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch {
          return field.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    const product = await Product.create({
      name,
      slug,
      description,
      price: Number(price),
      category,
      images: imageObjects,
      primaryImage: imageObjects[0]?.url || '',
      colors: parseArrayField(colors),
      occasion: parseArrayField(occasion),
      featured: featured === 'true' || featured === true,
      available: available === 'true' || available === true || available === undefined,
      stock: stock ? Number(stock) : 1,
      customizable: customizable === 'true' || customizable === true || customizable === undefined,
      tags: parseArrayField(tags)
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const {
      name,
      description,
      price,
      category,
      colors,
      occasion,
      featured,
      available,
      stock,
      customizable,
      tags,
      retainedImages,
      primaryImage
    } = req.body;

    if (name && name !== product.name) {
      product.name = name;
      let baseSlug = slugify(name, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;
      while (await Product.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      product.slug = slug;
    }

    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (category) product.category = category;

    const parseArrayField = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch {
          return field.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    if (colors !== undefined) product.colors = parseArrayField(colors);
    if (occasion !== undefined) product.occasion = parseArrayField(occasion);
    if (tags !== undefined) product.tags = parseArrayField(tags);
    if (featured !== undefined) product.featured = featured === 'true' || featured === true;
    if (available !== undefined) product.available = available === 'true' || available === true;
    if (stock !== undefined) product.stock = Number(stock);
    if (customizable !== undefined) product.customizable = customizable === 'true' || customizable === true;

    // Handle retained images
    let updatedImages = [];
    if (retainedImages) {
      const parsedRetained = typeof retainedImages === 'string' ? JSON.parse(retainedImages) : retainedImages;
      if (Array.isArray(parsedRetained)) {
        updatedImages = parsedRetained;
      }
    } else {
      updatedImages = product.images;
    }

    // Check deleted images and destroy from Cloudinary
    const retainedPublicIds = new Set(updatedImages.map((img) => img.publicId));
    for (const oldImg of product.images) {
      if (!retainedPublicIds.has(oldImg.publicId)) {
        await deleteFromCloudinary(oldImg.publicId);
      }
    }

    // Upload newly attached files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer, file.mimetype);
        updatedImages.push(uploaded);
      }
    }

    product.images = updatedImages;
    product.primaryImage = primaryImage || (updatedImages[0] ? updatedImages[0].url : '');

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete associated Cloudinary image assets
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.publicId) {
          await deleteFromCloudinary(img.publicId);
        }
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Bloom deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id/featured (Admin)
const toggleFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.featured = !product.featured;
    await product.save();
    res.status(200).json({ success: true, featured: product.featured, product });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id/available (Admin)
const toggleAvailable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.available = !product.available;
    await product.save();
    res.status(200).json({ success: true, available: product.available, product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  searchProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  toggleAvailable
};
