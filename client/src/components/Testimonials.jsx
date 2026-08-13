import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rhea Sen',
      role: 'Bride',
      review: 'Arya created my entire bridal bouquet and bridesmaid stems. Three years later, they still sit on my vanity looking as vibrant as the day I walked down the aisle!',
      rating: 5,
      location: 'Mumbai'
    },
    {
      name: 'Ananya Roy',
      role: 'Gift Recipient',
      review: 'I received the Lavender Love bouquet for my 25th birthday. The attention to detail is mind-blowing—everyone thinks they are real fresh flowers until they touch them!',
      rating: 5,
      location: 'Bangalore'
    },
    {
      name: 'Kabir & Meera',
      role: 'Anniversary Client',
      review: 'The Midnight Web arrangement was the showstopper for our anniversary dinner. Arya customized the exact plum and navy palette we wanted. Truly 10/10 craftsmanship.',
      rating: 5,
      location: 'New Delhi'
    }
  ];

  return (
    <section className="py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-blush-400">
            Love Notes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-sm text-charcoal-800/70 font-light">
            Hear what our patrons say about their handmade floral keepsakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-cream-200 shadow-sm flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-blush-100 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-charcoal-800/80 font-light leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-cream-200 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-semibold text-charcoal-900">{rev.name}</h4>
                  <span className="text-xs text-gray-400">{rev.role} • {rev.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
