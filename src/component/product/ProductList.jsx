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

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No products found. Try adjusting your filters.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="col">
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
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
