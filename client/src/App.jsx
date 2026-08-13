import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CustomOrderPage from './pages/CustomOrderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductsPage />} />
      <Route path="/custom-order" element={<CustomOrderPage />} />
    </Routes>
  );
}
