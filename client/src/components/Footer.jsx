import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Instagram, Mail, Phone, MapPin, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-20 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-charcoal-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blush-400/20 flex items-center justify-center text-blush-300 border border-blush-400/30">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Arya Blooms
              </span>
            </div>

            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              Handmade blooms, made to last. Artisanal flower atelier crafting bespoke paper, fabric, and velvet arrangements designed to keep special memories alive forever.
            </p>

            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-charcoal-800 hover:text-blush-300 hover:bg-charcoal-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:hello@aryablooms.com" className="p-2 rounded-full bg-charcoal-800 hover:text-blush-300 hover:bg-charcoal-700 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+919876543210" className="p-2 rounded-full bg-charcoal-800 hover:text-blush-300 hover:bg-charcoal-700 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <Link to="/" className="hover:text-blush-300 transition-colors">Home Atelier</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blush-300 transition-colors">Full Blooms Catalog</Link>
              </li>
              <li>
                <Link to="/custom-order" className="hover:text-blush-300 transition-colors">Bespoke Custom Request</Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-blush-300 transition-colors">About Arya</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li><Link to="/products?category=Bouquets" className="hover:text-blush-300 transition-colors">Signature Bouquets</Link></li>
              <li><Link to="/products?category=Birthday" className="hover:text-blush-300 transition-colors">Birthday Blooms</Link></li>
              <li><Link to="/products?category=Anniversary" className="hover:text-blush-300 transition-colors">Anniversary Keepsakes</Link></li>
              <li><Link to="/products?category=Special Occasions" className="hover:text-blush-300 transition-colors">Special Occasions</Link></li>
            </ul>
          </div>

          {/* Admin Direct Access */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Owner Access
            </h4>
            <div className="p-4 rounded-2xl bg-charcoal-800/80 border border-charcoal-700 space-y-2">
              <span className="text-[11px] text-gray-300 font-medium block">Arya Blooms Admin</span>
              <p className="text-[10px] text-gray-400 leading-normal font-light">
                Manage inventory, upload new bouquet photos, and process customer orders.
              </p>
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blush-300 hover:text-blush-200 pt-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Launch Admin Portal ↗
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Arya's Petals (Arya Blooms). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400" />
            <span>for flower lovers worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
