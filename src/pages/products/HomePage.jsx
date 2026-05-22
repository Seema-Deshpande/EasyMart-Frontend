import { useNavigate } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import { MOCK_PRODUCTS } from '../../data/products';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  const homeProducts = featuredProducts.length > 0 ? featuredProducts : MOCK_PRODUCTS.slice(0, 4);

  const handleSelectProduct = (product) => {
    navigate(`/products/${product._id || product.id}`);
  };

  const handleQuickView = (product) => {
    // For now, navigating to detail is a safe fallback or we could trigger a modal if App.jsx still has it.
    // The prompt implies more page-based navigation now.
    navigate(`/products/${product._id || product.id}`);
  };

  return (
    <div className="home-page pb-5">
      <section className="hero-section text-center py-5 shadow-sm text-white d-flex align-items-center" style={{ minHeight: '400px', background: 'linear-gradient(180deg, #667eea 0%, #a18cd1 100%)' }}>
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold mb-3">Welcome to EasyMart</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Discover amazing products at great prices
          </p>
          <button className="btn btn-primary btn-lg px-5 shadow rounded-3 fw-bold" onClick={() => navigate('/products')}>
            Shop Now <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </section>

      <section className="container py-5 mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">Featured Products</h2>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {homeProducts.map((product) => (
            <div className="col" key={product._id || product.id}>
              <ProductCard 
                product={product} 
                onSelect={() => handleSelectProduct(product)} 
                onQuickView={() => handleQuickView(product)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5 border-top">
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="card h-100 border-0 p-3">
              <div className="card-body">
                <i className="bi bi-truck fs-1 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">Free Shipping</h5>
                <p className="card-text text-muted small">On all orders over $100</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 p-3">
              <div className="card-body">
                <i className="bi bi-shield-check fs-1 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">Secure Payments</h5>
                <p className="card-text text-muted small">100% protected payments</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 p-3">
              <div className="card-body">
                <i className="bi bi-arrow-repeat fs-1 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">Easy Returns</h5>
                <p className="card-text text-muted small">30-day return policy</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 p-3">
              <div className="card-body">
                <i className="bi bi-headset fs-1 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">24/7 Support</h5>
                <p className="card-text text-muted small">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
