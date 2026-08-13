import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, HeartHandshake, CheckCircle2, Send, Palette, Calendar } from 'lucide-react';
import { createCustomRequest } from '../services/api';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Birthday',
    preferredColors: [],
    budget: 1500,
    description: '',
    referenceImages: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const colorOptions = [
    'Pastel Pink',
    'French Lavender',
    'Cream & Ivory',
    'Sky Blue',
    'Deep Plum / Gothic',
    'Sage Green',
    'Terracotta & Gold',
    'Sunflower Yellow'
  ];

  const handleColorToggle = (color) => {
    setFormData((prev) => {
      const exists = prev.preferredColors.includes(color);
      return {
        ...prev,
        preferredColors: exists
          ? prev.preferredColors.filter((c) => c !== color)
          : [...prev.preferredColors, color]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMessage('Please fill in your name, phone, and email.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const res = await createCustomRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        occasion: formData.occasion,
        preferredColors: formData.preferredColors,
        budget: Number(formData.budget),
        description: formData.description,
        referenceImages: formData.referenceImages ? [formData.referenceImages] : []
      });

      if (res.success) {
        setSubmittedRequest(res.customRequest);
      }
    } catch (err) {
      console.error('[Custom Request Error]:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to submit custom request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-500 text-xs font-semibold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Bespoke Floral Design</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 tracking-tight">
              Request Custom Bouquet
            </h1>
            <p className="text-sm sm:text-base text-charcoal-800/80 font-light">
              Have a specific vision, theme, or color palette in mind? Share your details below and Arya will collaborate directly with you to craft your custom handmade arrangement.
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-cream-200">
            {submittedRequest ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-500 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="font-serif text-3xl font-bold text-charcoal-900">
                  Custom Request Received!
                </h3>

                <p className="text-sm text-charcoal-800/80 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="font-medium">{submittedRequest.name}</strong>! Arya has received your custom inquiry for <strong className="font-medium">{submittedRequest.occasion}</strong> and will reach out via WhatsApp/Email within 24 hours.
                </p>

                <div className="bg-cream-50 p-4 rounded-2xl text-left space-y-2 text-xs text-charcoal-800 max-w-sm mx-auto">
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-gray-500">Occasion:</span>
                    <span className="font-semibold">{submittedRequest.occasion}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-gray-500">Estimated Budget:</span>
                    <span className="font-semibold text-charcoal-900">₹{submittedRequest.budget?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-semibold text-sage-500">{submittedRequest.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmittedRequest(null)}
                  className="mt-6 px-8 py-3 rounded-full bg-charcoal-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blush-400 transition-colors"
                >
                  Submit Another Custom Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Section 1: Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 border-b border-cream-200 pb-2">
                    1. Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Diya Kapoor"
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
                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="diya@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Occasion & Budget */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 border-b border-cream-200 pb-2">
                    2. Occasion & Budget
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Occasion / Event
                      </label>
                      <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                      >
                        <option value="Birthday">Birthday Celebration</option>
                        <option value="Anniversary">Anniversary / Romance</option>
                        <option value="Bridal Shower / Wedding">Bridal Shower / Wedding</option>
                        <option value="Home Decor">Home Interior Decor</option>
                        <option value="Corporate / Event Gift">Corporate / Event Gift</option>
                        <option value="Other">Other Custom Idea</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Target Budget (₹)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        min="500"
                        step="100"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Color Preferences */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 border-b border-cream-200 pb-2">
                    3. Preferred Color Palette
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => {
                      const isSelected = formData.preferredColors.includes(color);
                      return (
                        <button
                          type="button"
                          key={color}
                          onClick={() => handleColorToggle(color)}
                          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-blush-300 text-white shadow-sm scale-105'
                              : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{color}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Details & Inspiration */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 border-b border-cream-200 pb-2">
                    4. Design Vision & Details
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-800 mb-1">
                      Describe your dream arrangement *
                    </label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Mention flower types, bouquet height, wrapping paper preference, or personal story..."
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-800 mb-1">
                      Pinterest / Image Reference Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="referenceImages"
                      value={formData.referenceImages}
                      onChange={handleChange}
                      placeholder="https://pinterest.com/pin/123456789 or image link"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:border-blush-400"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-cream-200 text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-charcoal-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blush-400 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                  >
                    {loading ? 'Submitting Request...' : 'Send Custom Request to Arya'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
