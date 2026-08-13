import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';
import {
  Upload,
  X,
  ArrowLeft,
  Package,
  Image as ImageIcon,
  Sparkles,
  Trash2
} from 'lucide-react';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Bouquets');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');
  const [colors, setColors] = useState('');
  const [occasion, setOccasion] = useState('');
  const [tags, setTags] = useState('');
  
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [customizable, setCustomizable] = useState(true);

  // Existing images state
  const [existingImages, setExistingImages] = useState([]);
  const [primaryImage, setPrimaryImage] = useState('');

  // New file uploads state
  const [newFiles, setNewFiles] = useState([]);
  const [newFilePreviews, setNewFilePreviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Bouquets', 'Birthday', 'Anniversary', 'Customized', 'Special Occasions'];

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      if (res.success && res.product) {
        const prod = res.product;
        setName(prod.name || '');
        setDescription(prod.description || '');
        setCategory(prod.category || 'Bouquets');
        setPrice(prod.price || '');
        setStock(prod.stock !== undefined ? prod.stock : 1);
        setColors(Array.isArray(prod.colors) ? prod.colors.join(', ') : '');
        setOccasion(Array.isArray(prod.occasion) ? prod.occasion.join(', ') : '');
        setTags(Array.isArray(prod.tags) ? prod.tags.join(', ') : '');
        setFeatured(!!prod.featured);
        setAvailable(!!prod.available);
        setCustomizable(!!prod.customizable);
        setExistingImages(prod.images || []);
        setPrimaryImage(prod.primaryImage || (prod.images && prod.images[0]?.url) || '');
      }
    } catch (err) {
      console.error('[Fetch Product Edit Details Error]:', err);
      setError('Unable to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExistingImage = (publicId) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
    if (primaryImage === existingImages.find((img) => img.publicId === publicId)?.url) {
      setPrimaryImage(existingImages.find((img) => img.publicId !== publicId)?.url || '');
    }
  };

  const handleNewFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewFilePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category) {
      setError('Please fill in product name, description, price, and category.');
      return;
    }

    try {
      setSubmitting(true);
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
      formData.append('retainedImages', JSON.stringify(existingImages));
      formData.append('primaryImage', primaryImage);

      // Attach new file uploads
      newFiles.forEach((file) => {
        formData.append('images', file);
      });

      const res = await updateProduct(id, formData);
      if (res.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      console.error('[Update Product Error]:', err);
      setError(err.response?.data?.message || 'Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 font-medium text-xs">
        Loading product information...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Catalog</span>
        </button>

        <h1 className="text-xl font-bold text-slate-900">Edit Bloom: {name}</h1>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Info */}
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Manage Existing Images & Add New */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <span>Manage Product Images</span>
          </h2>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Existing Images:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {existingImages.map((img, idx) => (
                  <div
                    key={img.publicId || idx}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-100 ${
                      primaryImage === img.url ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'border-slate-200'
                    }`}
                  >
                    <img src={img.url} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(img.publicId)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPrimaryImage(img.url)}
                      className={`absolute bottom-2 left-2 right-2 py-1 text-[10px] font-bold uppercase rounded-lg text-center ${
                        primaryImage === img.url ? 'bg-indigo-600 text-white' : 'bg-slate-900/70 text-white hover:bg-indigo-600'
                      }`}
                    >
                      {primaryImage === img.url ? 'Primary Cover' : 'Set Cover'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-slate-700 block">Upload Additional Images:</span>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 transition-colors bg-slate-50/50">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewFilesChange}
                id="new-file-upload"
                className="hidden"
              />
              <label htmlFor="new-file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  Click to select new image files
                </span>
              </label>
            </div>

            {newFilePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {newFilePreviews.map((preview, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={preview} alt={`New Preview ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewFile(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Metadata */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cardBorder shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Attributes & Display Settings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Colors</label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Occasions</label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Featured Product</span>
                <span className="text-[10px] text-slate-500">Show on Homepage</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Available</span>
                <span className="text-[10px] text-slate-500">Allow Purchase</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={customizable}
                onChange={(e) => setCustomizable(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Customizable</span>
                <span className="text-[10px] text-slate-500">Enable Notes</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md"
          >
            {submitting ? 'Updating Bloom...' : 'Save Product Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}
