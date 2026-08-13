import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import OrderModal from '../components/OrderModal';
import { getProducts } from '../services/api';
import { Search, Filter, Flower2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderingProduct, setOrderingProduct] = useState(null);

  const categories = ['All', 'Bouquets', 'Birthday', 'Anniversary', 'Customized', 'Special Occasions'];

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== 'All') params.category = category;
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (sort === 'price-low') params.sort = 'price-low';
      if (sort === 'price-high') params.sort = 'price-high';
      if (sort === 'popular') params.sort = 'popular';

      const res = await getProducts(params);
      setProducts(res.products || []);
    } catch (err) {
      console.error('[Products Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-100 text-blush-500 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Flower Collection</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 tracking-tight">
              Our Handmade Blooms
            </h1>
            <p className="text-sm sm:text-base text-charcoal-800/80 font-light">
              Explore our complete collection of handmade paper, fabric, and velvet flower bouquets. Dynamically loaded from Arya's live catalog.
            </p>
          </div>

          {/* Search & Filters Controls Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-cream-200 mb-10 space-y-4">
            
            {/* Top Row: Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lavender, daisies, peonies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-cream-300 bg-cream-50 text-xs focus:outline-none focus:border-blush-400"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs font-medium text-charcoal-800 focus:outline-none focus:border-blush-400"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Popular / Featured</option>
                </select>
              </div>

            </div>

            {/* Bottom Row: Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar border-t border-cream-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setSearchParams(cat === 'All' ? {} : { category: cat });
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 ${
                    category === cat
                      ? 'bg-charcoal-900 text-white shadow-sm'
                      : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-4 h-96 animate-pulse space-y-4 border border-cream-200">
                  <div className="w-full h-56 bg-cream-200 rounded-2xl" />
                  <div className="h-5 bg-cream-200 rounded w-3/4" />
                  <div className="h-4 bg-cream-200 rounded w-1/2" />
                  <div className="h-8 bg-cream-200 rounded-full w-full mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 max-w-md mx-auto">
              <Flower2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-semibold text-charcoal-900">
                No Blooms Found
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                Try clearing your search query or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setCategory('All');
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-charcoal-900 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrderProduct={(prod) => {
            setSelectedProduct(null);
            setOrderingProduct(prod);
          }}
        />
      )}

      {/* Order Request Modal */}
      {orderingProduct && (
        <OrderModal
          product={orderingProduct}
          onClose={() => setOrderingProduct(null)}
        />
      )}
    </div>
  );
}
