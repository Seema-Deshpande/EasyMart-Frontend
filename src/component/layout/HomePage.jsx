import React from 'react';
import ProductCard from '../product/ProductCard';
import './HomePage.css';

const HomePage = ({ products, onSelectProduct, onShopNow }) => {
  return (
    <div className="home-page pb-5">
      <section className="hero-section text-center py-5 mb-5 shadow-sm">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Welcome to EasyMart</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Your one-stop shop for everything you need. Quality products, affordable prices, and fast shipping.
          </p>
          <button className="btn btn-primary btn-lg px-5 shadow" onClick={onShopNow}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Featured Products</h2>
          <button className="btn btn-link text-decoration-none p-0" onClick={onShopNow}>
            View All <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product._id || product.id}>
              <ProductCard 
                product={product} 
                onSelect={onSelectProduct} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
