import { useState } from 'react';
import './ProductDetail.css';
import { formatPrice, formatDate } from '../../utils/helper';

const ProductDetail = ({ product, isLoggedIn, showNotification }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  const {
    name,
    price,
    image,
    description,
    category,
    stock,
    rating: avgRating,
    numReviews
  } = product;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showNotification('Please log in to add items to your cart', 'error');
      return;
    }
    showNotification(`${name} (x${quantity}) added to cart!`, 'success');
  };

  const incrementQty = () => {
    if (quantity < stock) setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showNotification('Please enter a comment', 'error');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: "Current User", // Simplified for this task
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setHasReviewed(true);
    setShowReviewForm(false);
    setComment('');
    showNotification('Review submitted successfully!', 'success');
  };

  const isInStock = stock > 0;

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image-section">
          <img 
            src={image} 
            alt={name} 
            className="detail-image" 
            onError={handleImageError} 
          />
          {!isInStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        </div>

        <div className="product-info-section">
          <div className="category-badge">{category}</div>
          <h1 className="detail-name">{name}</h1>
          
          <div className="detail-rating-row">
            <span className="stars">{'★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating))}</span>
            <span className="review-count">({numReviews} reviews)</span>
          </div>

          <p className="detail-price">{formatPrice(price)}</p>
          <p className="detail-description">{description}</p>

          <div className={`detail-stock-info ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
            {isInStock ? `In Stock (${stock} available)` : 'Out of Stock'}
          </div>

          {isInStock && (
            <div className="action-row">
              <div className="quantity-stepper">
                <button onClick={decrementQty}>-</button>
                <span>{quantity}</span>
                <button onClick={incrementQty}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        
        {isLoggedIn && !hasReviewed && !showReviewForm && (
          <button 
            className="write-review-btn" 
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        )}

        {showReviewForm && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Submit Your Review</h3>
            <div className="form-group">
              <label>Rating:</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id || review._id} className="review-item">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <span className="review-stars">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <small className="review-date">{formatDate(review.createdAt)}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
