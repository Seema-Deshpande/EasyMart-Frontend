import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../../component/product/ProductList';
import { MOCK_PRODUCTS } from '../../data/products';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
      const matchesStock = !inStockOnly || product.stock > 0;
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((pageNum - 1) * ITEMS_PER_PAGE, pageNum * ITEMS_PER_PAGE);

  return (
    <ProductList 
      products={paginatedProducts}
      totalProducts={filteredProducts.length}
      currentPage={pageNum}
      totalPages={totalPages}
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
    />
  );
};

export default ProductsPage;
