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
  onQuickView,
  ...filterProps
}) => {
  return (
    <div className="product-list-page container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Our Products</h1>
        <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
          {totalProducts} products
        </span>
      </header>

      <ProductSearch {...filterProps} />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No products found. Try adjusting your filters.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id || product.id} className="col">
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            </div>
          ))
        )}
      </div>

      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
