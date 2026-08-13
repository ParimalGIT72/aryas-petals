const CustomRequest = require('../models/CustomRequest');

// POST /api/custom-requests (Customer)
const createCustomRequest = async (req, res, next) => {
  try {
    const { name, phone, email, occasion, preferredColors, budget, description, referenceImages } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, and email' });
    }

    const customReq = await CustomRequest.create({
      name,
      phone,
      email,
      occasion: occasion || 'General',
      preferredColors: Array.isArray(preferredColors) ? preferredColors : preferredColors ? [preferredColors] : [],
      budget: budget ? Number(budget) : 0,
      description: description || '',
      referenceImages: Array.isArray(referenceImages) ? referenceImages : [],
      status: 'New'
    });

    res.status(201).json({
      success: true,
      message: 'Custom request submitted successfully! Arya will review and reach out to you.',
      customRequest: customReq
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/custom-requests (Admin)
const getCustomRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const requests = await CustomRequest.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      customRequests: requests
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/custom-requests/:id/status (Admin)
const updateCustomRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid custom request status' });
    }

    const customReq = await CustomRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!customReq) {
      return res.status(404).json({ success: false, message: 'Custom request not found' });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      customRequest: customReq
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/custom-requests/:id (Admin)
const deleteCustomRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customReq = await CustomRequest.findByIdAndDelete(id);
    if (!customReq) {
      return res.status(404).json({ success: false, message: 'Custom request not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Custom request deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomRequest,
  getCustomRequests,
  updateCustomRequestStatus,
  deleteCustomRequest
};
