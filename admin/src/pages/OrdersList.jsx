import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/api';
import { ShoppingBag, Trash2, CheckCircle2, Clock, Truck, PackageCheck, AlertCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const statuses = ['All', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

  useEffect(() => {
    fetchOrdersList();
  }, [statusFilter]);

  const fetchOrdersList = async () => {
    try {
      setLoading(true);
      const res = await getOrders(statusFilter);
      setOrders(res.orders || []);
    } catch (err) {
      console.error('[Orders List Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateOrderStatus(id, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
        );
        showToast(`Order status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error('[Update Order Status Error]:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order record permanently?')) return;
    try {
      const res = await deleteOrder(id);
      if (res.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id));
        showToast('Order record deleted.');
      }
    } catch (err) {
      console.error('[Delete Order Error]:', err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Preparing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Ready':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
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
            Customer Orders Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track customer flower bouquet order submissions and update fulfillment status.
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
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-cardBorder'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-2xl border border-cardBorder shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-cardBorder text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Qty</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status Changer</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    Loading customer orders...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Order ID */}
                    <td className="py-3 px-4 font-mono text-[11px] font-bold text-indigo-600">
                      #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </td>

                    {/* Customer Info */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{order.customerName}</div>
                      <div className="text-[10px] text-slate-500">{order.phone} • {order.email}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 italic">{order.deliveryAddress}</div>
                      {order.customMessage && (
                        <div className="mt-1 p-1.5 rounded bg-amber-50/70 border border-amber-100 text-[10px] text-amber-900 font-light">
                          💌 "{order.customMessage}"
                        </div>
                      )}
                    </td>

                    {/* Product */}
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {order.productName || 'Custom Bouquet'}
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {order.quantity || 1}
                    </td>

                    {/* Total Price */}
                    <td className="py-3 px-4 font-bold text-slate-900">
                      ₹{order.totalPrice?.toLocaleString('en-IN')}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-500 text-[11px] font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Order Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No orders recorded for status "{statusFilter}".
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
