import { useState } from 'react';
import './ProductDetail.css';
import { formatPrice, formatDate } from '../../utils/helper';

const ProductDetail = ({ product, isLoggedIn, showNotification }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);
  const [reviewErrors, setReviewErrors] = useState({});

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
    const errors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!comment.trim()) {
      errors.comment = 'Comment is required';
    } else if (comment.trim().length < 10) {
      errors.comment = 'Comment must be at least 10 characters';
    }
    if (rating === 0) errors.rating = 'Please select a rating';

    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors);
      return;
    }

    const newReview = {
      id: Date.now(),
      name: "Current User", // Simplified for this task
      title,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setHasReviewed(true);
    setShowReviewForm(false);
    setTitle('');
    setComment('');
    setRating(0);
    setReviewErrors({});
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
              <h4 className="card-title mb-4">Submit Your Review</h4>
              <form onSubmit={handleReviewSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-bold">Rating</label>
                  <div className="d-flex gap-3 mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="form-check form-check-inline">
                        <input
                          className={`form-check-input ${reviewErrors.rating ? 'is-invalid' : ''}`}
                          type="radio"
                          name="ratingOptions"
                          id={`rating${num}`}
                          value={num}
                          checked={rating === num}
                          onChange={() => {
                            setRating(num);
                            if (reviewErrors.rating) setReviewErrors(prev => ({ ...prev, rating: '' }));
                          }}
                        />
                        <label className="form-check-label" htmlFor={`rating${num}`}>
                          {num} ★
                        </label>
                      </div>
                    ))}
                  </div>
                  {reviewErrors.rating && <div className="text-danger small">{reviewErrors.rating}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Review Title</label>
                  <input
                    type="text"
                    className={`form-control ${reviewErrors.title ? 'is-invalid' : ''}`}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (reviewErrors.title) setReviewErrors(prev => ({ ...prev, title: '' }));
                    }}
                    placeholder="Brief summary of your experience"
                  />
                  {reviewErrors.title && <div className="invalid-feedback">{reviewErrors.title}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Review Comment</label>
                  <textarea 
                    className={`form-control ${reviewErrors.comment ? 'is-invalid' : ''}`}
                    value={comment} 
                    onChange={(e) => {
                      setComment(e.target.value);
                      if (reviewErrors.comment) setReviewErrors(prev => ({ ...prev, comment: '' }));
                    }}
                    placeholder="Share your thoughts about this product (minimum 10 characters)..."
                    rows="4"
                  />
                  {reviewErrors.comment && <div className="invalid-feedback">{reviewErrors.comment}</div>}
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary px-4">Submit Review</button>
                  <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowReviewForm(false)}>Cancel</button>
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
                       <div>
                         <strong className="fs-5 d-block">{review.name}</strong>
                         {review.title && <h6 className="fw-bold text-dark mt-1">{review.title}</h6>}
                       </div>
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
