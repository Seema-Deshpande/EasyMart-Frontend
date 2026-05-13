import './ProductCard.css';
import { formatPrice } from '../../utils/helper';

const ProductCard = ({ product, onSelect }) => {
  const {
    name,
    price,
    images,
    image,
    stock,
    rating,
    numReviews
  } = product;

  // Prefer 'image' if exists, else first of 'images' array, else placeholder
  const displayImage = image || (images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x300?text=Product+Image');

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
  };

  const isInStock = stock > 0;

  return (
    <div className="card h-100 shadow-sm clickable border-0" onClick={() => onSelect && onSelect(product)}>
      <div className="position-relative">
        <img 
          src={displayImage} 
          alt={name} 
          className="card-img-top object-fit-cover" 
          style={{ height: '200px' }}
          onError={handleImageError}
        />
        {!isInStock && (
          <div className="position-absolute top-0 start-0 m-2 badge bg-danger text-white">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate mb-2" title={name}>{name}</h5>
        <h6 className="card-subtitle mb-2 text-primary fw-bold">{formatPrice(price)}</h6>
        
        <div className="mb-2">
          <span className="text-star me-1">{'★'.repeat(Math.round(rating))}</span>
          <span className="text-muted small">{'☆'.repeat(5 - Math.round(rating))} ({numReviews})</span>
        </div>

        <div className="mt-auto">
          <p className={`small mb-0 ${isInStock ? 'text-success' : 'text-danger'}`}>
            <i className={`bi bi-circle-fill me-1 tiny-dot`}></i>
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
