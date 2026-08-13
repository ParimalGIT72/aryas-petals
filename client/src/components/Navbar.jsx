import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower2, ShoppingBag, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Blooms', path: '/products' },
    { name: 'Custom Order', path: '/custom-order' },
    { name: 'About Arya', path: '/#about' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-blush-500 border border-blush-200 group-hover:scale-105 transition-transform duration-300">
            <Flower2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal-900 group-hover:text-blush-500 transition-colors">
              Arya Blooms
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-sage-500 -mt-1">
              Arya's Petals
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative ${
                  isActive ? 'text-blush-500 font-semibold' : 'text-charcoal-800 hover:text-blush-500'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blush-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/custom-order"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-sage-300 bg-sage-100/60 text-sage-500 hover:bg-sage-200 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage-400" />
            Bespoke Order
          </Link>

          {/* Admin Panel Quick Access */}
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Admin Portal"
            className="p-2 rounded-full text-gray-500 hover:text-charcoal-900 hover:bg-cream-200 transition-colors"
          >
            <ShieldCheck className="w-5 h-5 text-sage-400 hover:text-sage-500" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-charcoal-800 hover:text-blush-500 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-100/95 backdrop-blur-md border-b border-blush-100 px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal-800 hover:text-blush-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-blush-100 flex flex-col gap-3">
                <Link
                  to="/custom-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-blush-300 text-white font-medium text-sm shadow-sm"
                >
                  Request Custom Order
                </Link>
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-full border border-gray-300 text-xs text-gray-600 font-medium"
                >
                  Admin Portal Portal Access ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
