const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  searchProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  toggleAvailable
} = require('../controllers/productController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Product APIs
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/search', searchProducts);
router.get('/:slug', getProductBySlug);

// Protected Admin APIs
router.post('/', protectAdmin, upload.array('images', 5), createProduct);
router.put('/:id', protectAdmin, upload.array('images', 5), updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);
router.patch('/:id/featured', protectAdmin, toggleFeatured);
router.patch('/:id/available', protectAdmin, toggleAvailable);

module.exports = router;
