import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../services/api';
import { Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  MessageSquareHeart,
  IndianRupee,
  ArrowUpRight,
  PlusCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getAdminStats();
      setData(res);
    } catch (err) {
      console.error('[Dashboard Stats Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = data?.stats || {
    totalProducts: 0,
    availableProducts: 0,
    featuredProducts: 0,
    totalOrders: 0,
    totalCustomRequests: 0,
    totalRevenue: 0
  };

  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      link: '/admin/products'
    },
    {
      title: 'Available Products',
      value: stats.availableProducts,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      link: '/admin/products'
    },
    {
      title: 'Featured Products',
      value: stats.featuredProducts,
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      link: '/admin/orders'
    },
    {
      title: 'Custom Requests',
      value: stats.totalCustomRequests,
      icon: MessageSquareHeart,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      link: '/admin/custom-requests'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue?.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      link: '/admin/orders'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time catalog metrics and business activity for Arya Blooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Bloom</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-cardBorder h-32 animate-pulse space-y-3">
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.link}
                className="bg-white rounded-2xl p-6 border border-cardBorder shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Analytics & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-cardBorder p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500 font-medium">Latest bouquet order requests</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Bloom</th>
                  <th className="py-3 px-2">Price</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.recentOrders && data.recentOrders.length > 0 ? (
                  data.recentOrders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-900">{ord.customerName}</div>
                        <div className="text-[10px] text-slate-400">{ord.phone}</div>
                      </td>
                      <td className="py-3 px-2 text-slate-700 font-medium">{ord.productName}</td>
                      <td className="py-3 px-2 font-bold text-slate-900">₹{ord.totalPrice?.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">
                      No customer orders recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Custom Requests List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-cardBorder p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Custom Requests</h2>
              <p className="text-xs text-slate-500 font-medium">Bespoke arrangement inquiries</p>
            </div>
            <Link to="/admin/custom-requests" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              Manage →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentCustomRequests && data.recentCustomRequests.length > 0 ? (
              data.recentCustomRequests.map((req) => (
                <div key={req._id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{req.name}</span>
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      {req.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">Occasion: {req.occasion}</div>
                  <div className="text-[11px] text-slate-400 font-light truncate">{req.description || 'No specific notes'}</div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No custom requests received yet.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
