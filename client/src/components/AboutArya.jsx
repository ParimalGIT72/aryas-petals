import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutArya() {
  return (
    <section id="about" className="py-24 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800"
                  alt="Arya crafting handmade flower bouquet"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Founder Tag Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-cream-200 max-w-xs space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blush-400">Founder & Artisan</span>
                <h4 className="font-serif text-xl font-semibold text-charcoal-900">Arya Sharma</h4>
                <p className="text-xs text-gray-500 font-light">"Every petal tells a story of care and everlasting affection."</p>
              </div>
            </div>
          </motion.div>

          {/* Story Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-100 text-blush-500 text-xs font-semibold uppercase tracking-wider">
              <Flower2 className="w-3.5 h-3.5" />
              <span>Behind The Atelier</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight leading-tight">
              Crafting stories in every petal, made to endure forever.
            </h2>

            <p className="text-base text-charcoal-800/80 font-light leading-relaxed">
              Arya’s Petals began out of a deep personal passion for preservation. Saddened by how quickly fresh flowers wilted after special celebrations, Arya began experimenting with fine art paper, crepe, ribbon, and fabric to sculpt everlasting floral arrangements.
            </p>

            <p className="text-base text-charcoal-800/80 font-light leading-relaxed">
              Today, Arya’s Petals supplies luxury handmade bouquets for weddings, anniversaries, birthdays, and moody aesthetic spaces across the country. Every bloom is individually dyed, shaped, and wired by hand with unconditional devotion.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/custom-order"
                className="px-6 py-3 rounded-full bg-charcoal-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blush-400 transition-colors shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Collaborate With Arya
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
