import './ProductSearch.css';
import { CATEGORIES, SORT_OPTIONS } from '../../utils/ constant';

const ProductSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly
}) => {
  const isFilterActive = 
    searchTerm !== '' || 
    selectedCategory !== '' || 
    sortBy !== 'default' || 
    minPrice !== '' || 
    maxPrice !== '' || 
    inStockOnly;

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('default');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
  };

  return (
    <div className="card shadow-sm border-0 p-4 mb-5 bg-white rounded-3">
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select text-capitalize"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">$</span>
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="form-control border-start-0"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">$</span>
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-control border-start-0"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-check form-check-inline ms-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="inStockOnly"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <label className="form-check-label text-secondary fw-medium" htmlFor="inStockOnly">
              In Stock Only
            </label>
          </div>
        </div>
        {isFilterActive && (
          <div className="col-md-3 text-end">
            <button
              onClick={handleClearFilters}
              className="btn btn-link text-danger text-decoration-none p-0 fw-bold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
