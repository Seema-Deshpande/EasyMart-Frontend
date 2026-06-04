import './ProductCard.css';
import { getProductImage, generatePlaceholderImage } from '../../utils/imageHelper';

const ProductCard = ({ product, onSelect, onQuickView }) => {
  const {
    name,
    price,
    stock,
    rating,
    numReviews
  } = product;

  // Get best available image with fallback
  const displayImage = getProductImage(product);

  const handleImageError = (e) => {
    e.target.src = generatePlaceholderImage(name || 'Product Image');
  };

  const isInStock = stock > 0;

  return (
    <div className="card h-100 shadow-sm clickable product-card border-0 rounded-3 overflow-hidden">
      <div className="position-relative" onClick={() => onSelect && onSelect(product)}>
        <img 
          src={displayImage} 
          alt={name} 
          className="card-img-top object-fit-cover" 
          style={{ height: '280px' }}
          onError={handleImageError}
        />
        <div className="product-actions">
           <button 
             className="btn btn-light btn-sm shadow-sm quick-view-btn"
             onClick={(e) => {
               e.stopPropagation();
               onQuickView && onQuickView(product);
             }}
           >
             Quick View
           </button>
        </div>
      </div>
      
      <div className="card-body p-3 d-flex flex-column" onClick={() => onSelect && onSelect(product)}>
        <h5 className="card-title fw-bold text-dark mb-2 text-truncate" style={{ fontSize: '1.1rem' }}>{name}</h5>
        
        <div className="mt-auto">
          <h5 className="text-success fw-bold mb-1">${price.toFixed(2)}</h5>
          
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-star-fill text-warning me-1 small"></i>
            <span className="fw-bold me-1 small">{rating}</span>
            <span className="text-muted small">({numReviews} reviews)</span>
          </div>

          <div>
            <span className={`badge ${isInStock ? 'bg-success' : 'bg-danger'} px-2 py-1`}>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
