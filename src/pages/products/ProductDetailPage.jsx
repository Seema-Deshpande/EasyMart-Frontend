import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import useCart from '../../context/useCart';
import useAuth from '../../context/useAuth';
import Notification from '../../component/common/Notification';
import { MOCK_PRODUCTS } from '../../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  const product = useMemo(() => {
    return MOCK_PRODUCTS.find(p => String(p._id || p.id) === id);
  }, [id]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = () => {
    if (!user) {
      showNotification('Please log in to add items to your cart', 'error');
      return;
    }
    addItem(product);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  if (!product) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="product-detail-page container py-5">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="row g-5">
        <div className="col-md-6">
          <img 
            src={product.image || 'https://via.placeholder.com/600x600?text=Product+Image'} 
            alt={product.name} 
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>Products</a></li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
          
          <h1 className="fw-bold mb-3">{product.name}</h1>
          <div className="d-flex align-items-center mb-4">
            <div className="text-warning me-2">
              {'★'.repeat(Math.round(product.rating))}
              <span className="text-muted opacity-50">{'★'.repeat(5 - Math.round(product.rating))}</span>
            </div>
            <span className="text-muted">({product.reviews || 0} reviews)</span>
          </div>
          
          <h2 className="text-primary fw-bold mb-4">${product.price.toFixed(2)}</h2>
          
          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{product.description}</p>
          </div>
          
          <div className="mb-4">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'} p-2 px-3`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary btn-lg fw-bold" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="bi bi-cart-plus me-2"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
