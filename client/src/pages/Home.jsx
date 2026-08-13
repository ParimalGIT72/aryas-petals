import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandStatement from '../components/BrandStatement';
import FeaturedBlooms from '../components/FeaturedBlooms';
import WhyAryaBlooms from '../components/WhyAryaBlooms';
import AboutArya from '../components/AboutArya';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ProductDetailModal from '../components/ProductDetailModal';
import OrderModal from '../components/OrderModal';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderingProduct, setOrderingProduct] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 selection:bg-blush-200">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <BrandStatement />
        <FeaturedBlooms onSelectProduct={(prod) => setSelectedProduct(prod)} />
        <WhyAryaBlooms />
        <AboutArya />
        <Gallery />
        <Testimonials />
      </main>

      <Footer />

      {/* Product Detail Quick View Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrderProduct={(prod) => {
            setSelectedProduct(null);
            setOrderingProduct(prod);
          }}
        />
      )}

      {/* Direct Order Request Modal */}
      {orderingProduct && (
        <OrderModal
          product={orderingProduct}
          onClose={() => setOrderingProduct(null)}
        />
      )}
    </div>
  );
}
