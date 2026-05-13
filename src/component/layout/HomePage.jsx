import React from 'react';
import ProductCard from '../product/ProductCard';
import './HomePage.css';

const HomePage = ({ products, onSelectProduct, onShopNow }) => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to EasyMart</h1>
          <p>Your one-stop shop for everything you need. Quality products, affordable prices.</p>
          <button className="shop-now-btn" onClick={onShopNow}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product._id || product.id} 
              product={product} 
              onSelect={onSelectProduct} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
