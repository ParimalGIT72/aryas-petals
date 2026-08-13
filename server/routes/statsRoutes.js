const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../controllers/statsController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/stats', protectAdmin, getAdminStats);

module.exports = router;
