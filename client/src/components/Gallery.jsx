import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800',
      title: 'Midnight Web Velvet Arrangement',
      tag: 'Moody Aesthetics'
    },
    {
      url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
      title: 'Lavender & Cream Bouquet',
      tag: 'Pastel Dream'
    },
    {
      url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800',
      title: 'Wild Sky Blue Daisy Stem',
      tag: 'Wildflower'
    },
    {
      url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
      title: 'Blush Peonies & Ivory Ranunculus',
      tag: 'Bridal'
    },
    {
      url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
      title: 'Eucalyptus & Soft Statice Wrap',
      tag: 'Minimal'
    },
    {
      url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
      title: 'Rose Gold & Terracotta Bloom',
      tag: 'Custom Craft'
    }
  ];

  return (
    <section className="py-24 bg-cream-50 relative border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-blush-400">
            Pinterest & Instagram Feed
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
            The Atelier Gallery
          </h2>
          <p className="text-sm text-charcoal-800/70 font-light">
            Real arrangements handcrafted for our beautiful clients across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group bg-cream-200 cursor-pointer shadow-sm hover:shadow-xl"
            >
              <img
                src={item.url}
                alt={item.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blush-400">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-blush-200">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-xl font-medium mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
