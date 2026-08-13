import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, toggleFeatured, toggleAvailable } from '../services/api';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PackageCheck,
  PackageX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Confirmation Modal state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', 'Bouquets', 'Birthday', 'Anniversary', 'Customized', 'Special Occasions'];

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (search.trim()) params.search = search.trim();
      const res = await getProducts(params);
      setProducts(res.products || []);
    } catch (err) {
      console.error('[Products List Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const res = await toggleFeatured(id);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, featured: res.featured } : p))
        );
        showToast(`Featured status updated`);
      }
    } catch (err) {
      console.error('[Toggle Featured Error]:', err);
    }
  };

  const handleToggleAvailable = async (id) => {
    try {
      const res = await toggleAvailable(id);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, available: res.available } : p))
        );
        showToast(`Availability updated`);
      }
    } catch (err) {
      console.error('[Toggle Available Error]:', err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      setDeleting(true);
      const res = await deleteProduct(deleteCandidate._id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== deleteCandidate._id));
        showToast(`"${deleteCandidate.name}" deleted successfully.`);
      }
    } catch (err) {
      console.error('[Delete Error]:', err);
    } finally {
      setDeleting(false);
      setDeleteCandidate(null);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Products Catalog
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage store inventory, upload new bouquet photos, toggle featured items, and update stock.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-cardBorder shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by bloom title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
          />
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-cardBorder shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-cardBorder text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Bloom Image</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Available</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    Loading products catalog...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => {
                  const imgUrl = product.primaryImage || (product.images && product.images[0]?.url) || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800';
                  return (
                    <tr key={product._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Image */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/{product.slug}</div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {product.stock || 0}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleFeatured(product._id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all ${
                            product.featured
                              ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-2xs'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          {product.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>

                      {/* Available Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailable(product._id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all ${
                            product.available
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-red-100 text-red-600 border border-red-200'
                          }`}
                        >
                          {product.available ? <PackageCheck className="w-3 h-3" /> : <PackageX className="w-3 h-3" />}
                          {product.available ? 'Available' : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 inline-block transition-colors"
                          title="Edit Bloom"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteCandidate(product)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Bloom"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-cardBorder space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete this bloom?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  "This action cannot be undone." Are you sure you want to delete <strong className="text-slate-900">{deleteCandidate.name}</strong>?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteCandidate(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm"
                >
                  {deleting ? 'Deleting...' : 'Delete Bloom'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
