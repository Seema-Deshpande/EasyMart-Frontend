import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import ProductList from '../../component/product/ProductList';

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error, pagination } = useSelector((state) => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({
      search: searchTerm,
      category: selectedCategory,
      sort: sortBy,
      minPrice,
      maxPrice,
      page: pageNum
    }));
  }, [dispatch, searchTerm, selectedCategory, sortBy, minPrice, maxPrice, pageNum]);

  return (
    <ProductList 
      products={items}
      totalProducts={pagination.totalProducts}
      currentPage={pageNum}
      totalPages={pagination.totalPages}
      onPageChange={setPageNum}
      onSelectProduct={(p) => navigate(`/products/${p._id || p.id}`)}
      onQuickView={(p) => navigate(`/products/${p._id || p.id}`)}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      sortBy={sortBy}
      setSortBy={setSortBy}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      inStockOnly={inStockOnly}
      setInStockOnly={setInStockOnly}
      loading={loading}
      error={error}
    />
  );
};
      sortBy={sortBy}
      setSortBy={setSortBy}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      inStockOnly={inStockOnly}
      setInStockOnly={setInStockOnly}
    />
  );
};

export default ProductsPage;
