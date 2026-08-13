import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

export default function WhyAryaBlooms() {
  const pillars = [
    {
      icon: Sparkles,
      title: '100% Handcrafted',
      desc: 'Every single stem and petal is shaped individually using artisan paper, ribbon, and fine fabrics.'
    },
    {
      icon: ShieldCheck,
      title: 'Everlasting & Durable',
      desc: 'No watering, no wilting, no allergic pollen. Designed to preserve memories for years to come.'
    },
    {
      icon: HeartHandshake,
      title: 'Bespoke Customization',
      desc: 'Tailor color palettes, bouquet sizing, gift tags, and arrangements specifically for your unique occasion.'
    },
    {
      icon: Leaf,
      title: 'Eco-Conscious Craft',
      desc: 'Crafted with sustainable materials and plastic-free aesthetic packaging inspired by slow living.'
    }
  ];

  return (
    <section className="py-24 bg-cream-50 relative border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-500 text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            <span>The Arya Blooms Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
            Why Choose Arya's Petals?
          </h2>
          <p className="text-base text-charcoal-800/80 font-light leading-relaxed">
            Unlike mass-produced plastic flowers or short-lived natural bouquets, our handmade creations combine delicate artistry with everlasting life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-cream-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blush-100/70 text-blush-500 flex items-center justify-center border border-blush-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-charcoal-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-charcoal-800/70 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
