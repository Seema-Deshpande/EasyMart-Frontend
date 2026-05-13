import './ProductCard.css';
import { formatPrice } from '../../utils/helper';

const ProductCard = ({ product, onSelect }) => {
  const {
    name,
    price,
    image,
    stock,
    rating,
    numReviews
  } = product;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
  };

  const isInStock = stock > 0;

  return (
    <div className="product-card" onClick={() => onSelect && onSelect(product)}>
      <div className="product-image-container">
        <img 
          src={image} 
          alt={name} 
          className="product-image" 
          onError={handleImageError}
        />
        {!isInStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{formatPrice(price)}</p>
        
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))}</span>
          <span className="review-count">({numReviews} Reviews)</span>
        </div>

        <p className={`stock-status ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
