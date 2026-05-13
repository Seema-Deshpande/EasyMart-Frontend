import ProductSearch from './ProductSearch';
import ProductCard from './ProductCard';
import Pagination from '../common/Pagination';
import './ProductList.css';

const ProductList = ({
  products,
  totalProducts,
  currentPage,
  totalPages,
  onPageChange,
  onSelectProduct,
  ...filterProps
}) => {
  return (
    <div className="product-list-page">
      <header className="product-list-header">
        <h1>Our Products</h1>
        <p className="product-count">{totalProducts} product(s) found</p>
      </header>

      <ProductSearch {...filterProps} />

      {products.length === 0 ? (
        <div className="no-products-message">
          <h3>No products match your search</h3>
          <p>Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
