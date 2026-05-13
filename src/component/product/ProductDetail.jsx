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
    images,
    image,
    description,
    category,
    stock,
    rating: avgRating,
    numReviews
  } = product;

  // Use 'image' property if it exists, otherwise use the first element of 'images' array
  const displayImage = image || (images && images.length > 0 ? images[0] : 'https://via.placeholder.com/600x600?text=Product+Image');

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
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="position-relative shadow-sm rounded overflow-hidden">
            <img 
              src={displayImage} 
              alt={name} 
              className="img-fluid w-100 object-fit-cover" 
              style={{ minHeight: '400px' }}
              onError={handleImageError} 
            />
            {!isInStock && (
              <div className="position-absolute top-50 start-50 translate-middle badge bg-danger fs-4 opacity-75">
                Out of Stock
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item text-primary">{category}</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-3">{name}</h1>
          
          <div className="d-flex align-items-center mb-4 text-star fs-5">
            <div>
              {'★'.repeat(Math.round(avgRating))}
              <span className="text-muted">{'☆'.repeat(5 - Math.round(avgRating))}</span>
            </div>
            <span className="ms-2 text-muted small">({numReviews} reviews)</span>
          </div>

          <h2 className="text-primary fw-bold mb-4">{formatPrice(price)}</h2>
          <p className="text-muted mb-4 lead">{description}</p>

          <div className={`mb-4 fw-bold ${isInStock ? 'text-success' : 'text-danger'}`}>
             <i className="bi bi-circle-fill me-2 tiny-dot"></i>
             {isInStock ? `In Stock (${stock} available)` : 'Out of Stock'}
          </div>

          {isInStock && (
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ width: '130px' }}>
                <button className="btn btn-outline-secondary" type="button" onClick={decrementQty}>-</button>
                <input type="text" className="form-control text-center bg-white" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={incrementQty}>+</button>
              </div>
              <button className="btn btn-primary btn-lg shadow-sm" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 pt-5 border-top">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Customer Reviews</h2>
          {isLoggedIn && !hasReviewed && !showReviewForm && (
            <button className="btn btn-outline-primary" onClick={() => setShowReviewForm(true)}>
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title mb-3">Submit Your Review</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                  <label className="form-label">Rating:</label>
                  <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment:</label>
                  <textarea 
                    className="form-control"
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows="4"
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-light" onClick={() => setShowReviewForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row g-4">
          {reviews.length === 0 ? (
            <div className="col-12 text-center py-5 bg-light rounded">
              <p className="mb-0 text-muted fs-5">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id || review._id} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                       <strong className="fs-5">{review.name}</strong>
                       <span className="text-star">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="card-text mb-2 text-muted">{review.comment}</p>
                    <small className="text-muted fst-italic">{formatDate(review.createdAt)}</small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
