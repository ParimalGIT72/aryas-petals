import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, HeartHandshake } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      {/* Decorative Pastel Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blush-100/60 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-lavender-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sage-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 border border-blush-200 text-blush-500 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Flower Atelier</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal-900 leading-[1.1]">
              Handmade blooms, <br />
              <span className="italic font-normal text-blush-400">made to last.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-charcoal-800/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Welcome to <strong className="font-medium text-charcoal-900">Arya Blooms</strong>. Each stem is meticulously handcrafted from premium materials—bringing everlasting elegance, zero maintenance, and timeless emotional warmth to your special moments.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-charcoal-900 text-cream-50 font-medium text-sm hover:bg-blush-400 hover:text-white transition-all duration-300 shadow-lg shadow-charcoal-900/10 group"
              >
                <span>Explore Blooms Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/custom-order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-blush-300 bg-white/80 text-charcoal-900 font-medium text-sm hover:bg-blush-100 transition-all duration-300"
              >
                <HeartHandshake className="w-4 h-4 text-blush-400" />
                <span>Request Custom Bouquet</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-8 border-t border-cream-300/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="font-serif text-2xl font-semibold text-charcoal-900">100%</span>
                <p className="text-xs text-charcoal-800/70 font-light">Handcrafted Stems</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold text-charcoal-900">Everlasting</span>
                <p className="text-xs text-charcoal-800/70 font-light">Never Wilts or Fades</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold text-charcoal-900">Custom</span>
                <p className="text-xs text-charcoal-800/70 font-light">Colors & Occasions</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Editorial Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Pinterest Image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-cream-200 relative group">
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1000"
                  alt="Arya Blooms Handmade Lavender Arrangement"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-blush-200 font-medium">Featured Craft</span>
                  <h3 className="font-serif text-2xl font-semibold">Lavender & Pastel Cream Bouquet</h3>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-cream-300 max-w-xs flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-blush-400 shrink-0">
                  <Heart className="w-5 h-5 fill-blush-300" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-charcoal-900">Made With Love</h4>
                  <p className="text-[11px] text-gray-500 font-light">Each petal shaped individually by hand</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-cream-300 flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-sage-400 animate-ping" />
                <span className="text-xs font-medium text-charcoal-900">Accepting Custom Orders</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
