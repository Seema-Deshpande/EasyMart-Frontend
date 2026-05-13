import './ProductSearch.css';
import { CATEGORIES } from '../../utils/ constant';

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
    <div className="product-search-container">
      <div className="search-row">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <div className="filter-row">
        <div className="price-filters">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
          />
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In Stock Only
        </label>

        {isFilterActive && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
