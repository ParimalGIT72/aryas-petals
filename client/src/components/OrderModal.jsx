import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, HeartHandshake, Send, Sparkles } from 'lucide-react';
import { createOrder } from '../services/api';

export default function OrderModal({ product, onClose }) {
  if (!product) return null;

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    quantity: 1,
    customMessage: '',
    deliveryAddress: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.email || !formData.deliveryAddress) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const res = await createOrder({
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        productId: product._id,
        quantity: Number(formData.quantity),
        customMessage: formData.customMessage,
        deliveryAddress: formData.deliveryAddress
      });

      if (res.success) {
        setSubmittedOrder(res.order);
      }
    } catch (err) {
      console.error('[Order Submit Error]:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to submit order request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = (product.price || 0) * (formData.quantity || 1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/60 backdrop-blur-md">
        
        {/* Backdrop */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-cream-200 w-full max-w-xl overflow-hidden z-10 p-6 sm:p-8 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Screen */}
          {submittedOrder ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-500 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-charcoal-900">
                Order Placed Successfully!
              </h3>

              <p className="text-sm text-charcoal-800/80 font-light max-w-md mx-auto">
                Thank you, <strong className="font-medium">{submittedOrder.customerName}</strong>! Arya has received your order for <strong className="font-medium">{product.name}</strong> and will contact you via WhatsApp/Email shortly to confirm delivery.
              </p>

              <div className="bg-cream-100 p-4 rounded-2xl text-left space-y-2 text-xs text-charcoal-800 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-cream-200 pb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono font-medium">{submittedOrder._id}</span>
                </div>
                <div className="flex justify-between border-b border-cream-200 pb-2">
                  <span className="text-gray-500">Total Price:</span>
                  <span className="font-semibold text-charcoal-900">₹{submittedOrder.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-semibold text-sage-500">{submittedOrder.status}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full py-3.5 rounded-full bg-charcoal-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blush-400 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blush-500 bg-blush-100 px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Artisan Order</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Order "{product.name}"
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your delivery details to place an order request.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-800 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-charcoal-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="priya@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-800 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max={product.stock || 10}
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-800 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="deliveryAddress"
                  rows="2"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                  placeholder="Street address, Apartment / Flat No, City, Pincode"
                  className="w-full px-4 py-2 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-800 mb-1">
                  Personal Gift Note / Custom Message (Optional)
                </label>
                <textarea
                  name="customMessage"
                  rows="2"
                  value={formData.customMessage}
                  onChange={handleChange}
                  placeholder="Write a message to attach inside the flower bouquet greeting card..."
                  className="w-full px-4 py-2 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                />
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-charcoal-900">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-charcoal-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blush-400 transition-colors shadow-lg flex items-center gap-2"
                >
                  {loading ? 'Submitting Order...' : 'Submit Order Request'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
