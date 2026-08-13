import React, { useState, useEffect } from 'react';
import { getCustomRequests, updateCustomRequestStatus, deleteCustomRequest } from '../services/api';
import { MessageSquareHeart, Trash2, CheckCircle2, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomRequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Rejected'];

  useEffect(() => {
    fetchRequestsList();
  }, [statusFilter]);

  const fetchRequestsList = async () => {
    try {
      setLoading(true);
      const res = await getCustomRequests(statusFilter);
      setRequests(res.customRequests || []);
    } catch (err) {
      console.error('[Custom Requests List Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateCustomRequestStatus(id, newStatus);
      if (res.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error('[Update Custom Request Error]:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this custom request permanently?')) return;
    try {
      const res = await deleteCustomRequest(id);
      if (res.success) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        showToast('Custom request deleted.');
      }
    } catch (err) {
      console.error('[Delete Custom Request Error]:', err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Contacted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
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
            className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Custom Bouquet Requests
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review bespoke arrangement inquiries, contact clients, and manage design status.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-cardBorder'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Requests Table */}
      <div className="bg-white rounded-2xl border border-cardBorder shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-cardBorder text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Occasion</th>
                <th className="py-3.5 px-4">Colors & Budget</th>
                <th className="py-3.5 px-4">Design Notes</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Quick Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    Loading custom bouquet requests...
                  </td>
                </tr>
              ) : requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Client Info */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{req.name}</div>
                      <div className="text-[10px] text-slate-500">{req.phone}</div>
                      <div className="text-[10px] text-slate-400">{req.email}</div>
                    </td>

                    {/* Occasion */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                        {req.occasion}
                      </span>
                    </td>

                    {/* Colors & Budget */}
                    <td className="py-3 px-4 space-y-1">
                      <div className="font-bold text-slate-900">
                        ₹{req.budget?.toLocaleString('en-IN')}
                      </div>
                      {req.preferredColors && req.preferredColors.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {req.preferredColors.map((col, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600">
                              {col}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="text-slate-700 text-xs line-clamp-2 leading-relaxed font-light">
                        {req.description || 'No description entered.'}
                      </p>
                      {req.referenceImages && req.referenceImages.length > 0 && (
                        <a
                          href={req.referenceImages[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-semibold hover:underline mt-1"
                        >
                          <ExternalLink className="w-3 h-3" /> View Reference Link
                        </a>
                      )}
                    </td>

                    {/* Status Changer Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none cursor-pointer ${getStatusStyle(req.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    {/* Contact Action Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${req.phone?.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1 hover:bg-emerald-100"
                        >
                          <Phone className="w-3 h-3" /> WhatsApp
                        </a>
                        <a
                          href={`mailto:${req.email}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold flex items-center gap-1 hover:bg-slate-200"
                        >
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No custom requests found for status "{statusFilter}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
