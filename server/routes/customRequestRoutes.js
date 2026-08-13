const express = require('express');
const router = express.Router();
const {
  createCustomRequest,
  getCustomRequests,
  updateCustomRequestStatus,
  deleteCustomRequest
} = require('../controllers/customRequestController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', createCustomRequest);
router.get('/', protectAdmin, getCustomRequests);
router.put('/:id/status', protectAdmin, updateCustomRequestStatus);
router.delete('/:id', protectAdmin, deleteCustomRequest);

module.exports = router;
