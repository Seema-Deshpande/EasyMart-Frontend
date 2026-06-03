import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { fetchProductById, clearSelectedProduct } from '../../store/productSlice';
import Notification from '../../component/common/Notification';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = () => {
    if (!user) {
      showNotification('Please log in to add items to your cart', 'error');
      return;
    }
    dispatch(addToCart({ productId: product._id || product.id, quantity: 1 }));
    showNotification(`${product.name} added to cart!`, 'success');
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (error) return <div className="container py-5 text-center text-danger">{error}</div>;
  if (!product) return <div className="container py-5 text-center">Product not found</div>;

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
            src={(product.images && product.images[0]) || product.image || 'https://via.placeholder.com/600x600?text=Product+Image'} 
            alt={product.name} 
            className="img-fluid rounded shadow"
            onError={(e) => e.target.src = 'https://via.placeholder.com/600x600?text=P'}
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
