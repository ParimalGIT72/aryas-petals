import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Sparkles, Check, Heart, Shield, PackageCheck, AlertCircle } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onOrderProduct }) {
  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: product.primaryImage || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800', publicId: '1' }];

  const [selectedImg, setSelectedImg] = useState(images[0]?.url || product.primaryImage);
  const isAvailable = product.available && (product.stock === undefined || product.stock > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-charcoal-900/60 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-cream-200 w-full max-w-4xl overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-cream-100/80 hover:bg-cream-200 text-charcoal-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Left: Gallery Column */}
            <div className="p-6 bg-cream-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cream-200">
              
              {/* Main Image Display */}
              <div className="aspect-[4/4] rounded-2xl overflow-hidden bg-white shadow-inner border border-cream-200 relative">
                <img
                  src={selectedImg}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {!isAvailable && (
                  <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-xs flex items-center justify-center">
                    <span className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                      Currently Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img.url)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImg === img.url ? 'border-blush-400 scale-105 shadow-sm' : 'border-cream-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Ordering Column */}
            <div className="p-8 flex flex-col justify-between space-y-6">
              <div>
                
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blush-100 text-blush-500">
                    {product.category}
                  </span>
                  <span className={`text-xs font-medium flex items-center gap-1 ${isAvailable ? 'text-sage-500' : 'text-red-500'}`}>
                    {isAvailable ? <PackageCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {isAvailable ? `In Stock (${product.stock || 1})` : 'Out of Stock'}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-3xl font-semibold text-charcoal-900">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400 font-light">Taxes & Handcrafted Care included</span>
                </div>

                {/* Description */}
                <p className="text-sm text-charcoal-800/80 font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Palette Badges */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                      Color Palette
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg text-xs bg-cream-100 text-charcoal-800 border border-cream-200">
                          🌸 {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Occasion Badges */}
                {product.occasion && product.occasion.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                      Best For Occasions
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.occasion.map((occ, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg text-xs bg-sage-100/70 text-sage-500 font-medium">
                          ✨ {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customization Badge */}
                {product.customizable && (
                  <div className="p-3 rounded-xl bg-blush-100/50 border border-blush-200 flex items-center gap-2 text-xs text-blush-500 font-medium mb-6">
                    <Sparkles className="w-4 h-4 shrink-0 text-blush-400" />
                    <span>Custom ribbon colors and personalized gift note available upon checkout.</span>
                  </div>
                )}
              </div>

              {/* Action Section */}
              <div className="pt-4 border-t border-cream-200 space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onOrderProduct(product);
                  }}
                  disabled={!isAvailable}
                  className={`w-full py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    isAvailable
                      ? 'bg-charcoal-900 text-white hover:bg-blush-400 hover:text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {isAvailable ? 'Order This Bloom' : 'Currently Unavailable'}
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
