import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const isAvailable = product.available && (product.stock === undefined || product.stock > 0);
  const primaryImg = product.primaryImage || (product.images && product.images[0]?.url) || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-cream-200 flex flex-col h-full group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/4] bg-cream-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-charcoal-900 shadow-sm border border-cream-200">
            {product.category}
          </span>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blush-100/90 backdrop-blur-md text-blush-500 shadow-sm border border-blush-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blush-400" />
              Featured
            </span>
          </div>
        )}

        {/* Availability Overlay Banner */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="bg-white/95 px-4 py-2 rounded-xl text-center shadow-lg border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                Currently Unavailable
              </span>
            </div>
          </div>
        )}

        {/* Quick View Button on Hover */}
        {isAvailable && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="px-5 py-2.5 rounded-full bg-white text-charcoal-900 text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-blush-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              onClick={() => onSelectProduct(product)}
              className="font-serif text-xl font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors cursor-pointer line-clamp-1"
            >
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-charcoal-800/70 font-light line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color Tags */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cream-200/60 text-charcoal-800/80"
                >
                  {col}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-gray-400 font-medium self-center">
                  +{product.colors.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block">Price</span>
            <span className="font-serif text-2xl font-semibold text-charcoal-900">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onSelectProduct(product)}
            disabled={!isAvailable}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              isAvailable
                ? 'bg-cream-200 text-charcoal-900 hover:bg-blush-400 hover:text-white shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            {isAvailable ? 'View Bloom' : 'Unavailable'}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
