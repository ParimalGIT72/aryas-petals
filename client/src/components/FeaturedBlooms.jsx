import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '../services/api';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight, Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedBlooms({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      const data = await getFeaturedProducts();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      console.error('[Featured Blooms Fetch Error]:', err);
      setError('Unable to load featured blooms right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-100 text-blush-500 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Our Signature Blooms
            </h2>
            <p className="text-sm sm:text-base text-charcoal-800/70 font-light mt-2 max-w-xl">
              Hand-picked designs directly from Arya's atelier. Fetching live from our product catalog.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-900 hover:text-blush-500 transition-colors group"
          >
            <span>View All Blooms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-4 h-96 animate-pulse space-y-4 border border-cream-200">
                <div className="w-full h-56 bg-cream-200 rounded-2xl" />
                <div className="h-5 bg-cream-200 rounded w-3/4" />
                <div className="h-4 bg-cream-200 rounded w-1/2" />
                <div className="h-8 bg-cream-200 rounded-full w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="bg-blush-100/60 border border-blush-200 rounded-2xl p-8 text-center text-charcoal-800 max-w-md mx-auto">
            <Flower2 className="w-8 h-8 text-blush-400 mx-auto mb-2 animate-bounce" />
            <p className="font-serif text-lg font-medium">{error}</p>
            <button
              onClick={fetchFeatured}
              className="mt-4 px-4 py-2 bg-charcoal-900 text-white rounded-full text-xs font-semibold"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 max-w-md mx-auto">
            <Flower2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-medium text-charcoal-900">No Featured Blooms Available</h3>
            <p className="text-xs text-gray-500 mt-1">Check back soon or explore our full collection.</p>
          </div>
        )}

      </div>
    </section>
  );
}
