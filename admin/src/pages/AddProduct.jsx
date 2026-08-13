import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import {
  Upload,
  X,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Package,
  Image as ImageIcon
} from 'lucide-react';

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Bouquets');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [colors, setColors] = useState('Lavender, Cream, Sage');
  const [occasion, setOccasion] = useState('Birthday, Anniversary');
  const [tags, setTags] = useState('handmade, everlasting, bouquet');
  
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [customizable, setCustomizable] = useState(true);

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [primaryImageIdx, setPrimaryImageIdx] = useState(0);
  
  const [presetUrls, setPresetUrls] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Bouquets', 'Birthday', 'Anniversary', 'Customized', 'Special Occasions'];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    if (primaryImageIdx >= index && primaryImageIdx > 0) {
      setPrimaryImageIdx(primaryImageIdx - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category) {
      setError('Please fill in product name, description, price, and category.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('colors', colors);
      formData.append('occasion', occasion);
      formData.append('tags', tags);
      formData.append('featured', featured);
      formData.append('available', available);
      formData.append('customizable', customizable);

      // Attach file buffers
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Attach preset image URL if entered manually
      if (presetUrls.trim()) {
        const urlsArray = presetUrls.split('\n').map((u) => u.trim()).filter(Boolean);
        formData.append('existingImageUrls', JSON.stringify(urlsArray));
      }

      const res = await createProduct(formData);
      if (res.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      console.error('[Create Product Error]:', err);
      setError(err.response?.data?.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Catalog</span>
        </button>

        <h1 className="text-xl font-bold text-slate-900">Add New Bloom</h1>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600" />
            <span>Basic Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Velvet Night Bouquet"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="899"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed floral arrangement description..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <span>Product Images (Cloudinary Multi-Upload)</span>
          </h2>

          {/* Upload Drop Zone */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 transition-colors bg-slate-50/50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              id="file-upload"
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Click to upload bloom photographs
              </span>
              <span className="text-[11px] text-slate-400 font-light">
                PNG, JPG, WEBP up to 10MB each. Will upload directly to Cloudinary.
              </span>
            </label>
          </div>

          {/* Image Previews Grid */}
          {filePreviews.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-700 block">Uploaded Image Previews:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filePreviews.map((preview, idx) => (
                  <div
                    key={idx}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-100 group ${
                      primaryImageIdx === idx ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'border-slate-200'
                    }`}
                  >
                    <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPrimaryImageIdx(idx)}
                      className={`absolute bottom-2 left-2 right-2 py-1 text-[10px] font-bold uppercase rounded-lg text-center ${
                        primaryImageIdx === idx ? 'bg-indigo-600 text-white' : 'bg-slate-900/70 text-white hover:bg-indigo-600'
                      }`}
                    >
                      {primaryImageIdx === idx ? 'Primary Cover' : 'Set Cover'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Fallback URL input */}
          <div className="pt-2">
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Or paste direct Image URLs (one per line):
            </label>
            <textarea
              rows="2"
              value={presetUrls}
              onChange={(e) => setPresetUrls(e.target.value)}
              placeholder="https://images.unsplash.com/photo-1561181286..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono"
            />
          </div>
        </div>

        {/* Section 3: Product Metadata Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Product Details & Attributes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Colors (comma separated)
              </label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="Lavender, Cream, Sage"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Occasions (comma separated)
              </label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="Birthday, Anniversary"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="handmade, everlasting"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Display Settings Checkboxes */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3">
            Visibility & Customization Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-indigo-50/50 transition-colors">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Featured Product</span>
                <span className="text-[10px] text-slate-500">Show on Customer Homepage</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-indigo-50/50 transition-colors">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Available for Purchase</span>
                <span className="text-[10px] text-slate-500">Enable Customer Orders</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-indigo-50/50 transition-colors">
              <input
                type="checkbox"
                checked={customizable}
                onChange={(e) => setCustomizable(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Customizable</span>
                <span className="text-[10px] text-slate-500">Accept Ribbon / Note Edits</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
          >
            {loading ? 'Uploading & Creating Product...' : 'Create Product'}
          </button>
        </div>

      </form>
    </div>
  );
}
