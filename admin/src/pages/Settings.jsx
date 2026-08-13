import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Server, CheckCircle2, Cloud, Database, Lock } from 'lucide-react';
import api from '../services/api';

export default function Settings() {
  const { admin } = useAuth();
  const [serverHealth, setServerHealth] = useState('Checking...');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await api.get('/');
      if (res.data && res.data.status === 'Healthy') {
        setServerHealth('Connected & Healthy');
      } else {
        setServerHealth('Connected');
      }
    } catch {
      setServerHealth('API Disconnected');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Admin Settings & System Status
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Store admin profile settings, security overview, and system health status.
        </p>
      </div>

      {/* Admin Profile Card */}
      <div className="bg-white rounded-2xl border border-cardBorder p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span>Active Admin Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Admin Name</span>
            <div className="text-sm font-bold text-slate-900">{admin?.name || 'Arya (Owner)'}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Email Address</span>
            <div className="text-sm font-bold text-slate-900">{admin?.email || 'admin@aryablooms.com'}</div>
          </div>
        </div>
      </div>

      {/* Infrastructure Health Status Card */}
      <div className="bg-white rounded-2xl border border-cardBorder p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-cardBorder pb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-600" />
          <span>Infrastructure & API Connectivity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-xs font-bold uppercase tracking-wider">Express Backend</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-emerald-900">{serverHealth}</div>
            <span className="text-[10px] text-emerald-600 block">http://localhost:5000</span>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
            <div className="flex items-center justify-between text-indigo-700">
              <span className="text-xs font-bold uppercase tracking-wider">Database</span>
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-indigo-900">MongoDB Atlas / Mongoose</div>
            <span className="text-[10px] text-indigo-600 block">Collections: Products, Orders, Admin</span>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
            <div className="flex items-center justify-between text-purple-700">
              <span className="text-xs font-bold uppercase tracking-wider">Cloud Storage</span>
              <Cloud className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-purple-900">Cloudinary Media SDK</div>
            <span className="text-[10px] text-purple-600 block">Product asset hosting</span>
          </div>
        </div>
      </div>

    </div>
  );
}
