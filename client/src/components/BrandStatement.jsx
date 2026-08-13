import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Feather, Heart } from 'lucide-react';

export default function BrandStatement() {
  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden border-y border-cream-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush-100 text-blush-500 mb-2"
        >
          <Flower className="w-6 h-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-charcoal-900 leading-snug"
        >
          “We believe flowers should hold onto your memories as long as you do.”
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-charcoal-800/80 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Every bouquet from <span className="font-serif font-semibold text-blush-400">Arya’s Petals</span> is an artisanal piece of art created stem-by-stem. Designed with a Pinterest-inspired aesthetic, gentle pastel palettes, and durable craftsmanship so your expressions of love remain radiant for years to come.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 flex items-center justify-center gap-6 text-xs text-charcoal-800 uppercase tracking-widest font-medium"
        >
          <span className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-sage-400" />
            Hand Sculpted
          </span>
          <span className="text-blush-300">•</span>
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-blush-400" />
            Zero Wilting
          </span>
          <span className="text-blush-300">•</span>
          <span>Bespoke Design</span>
        </motion.div>

      </div>
    </section>
  );
}
