import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import HomePage from './component/layout/HomePage';
import ProductList from './component/product/ProductList';
import ProductDetail from './component/product/ProductDetail';
import LoginForm from './component/auth/LoginForm';
import Notification from './component/common/Notification';
import { MOCK_PRODUCTS } from './data/products';

const VALID_PAGES = ['home', 'products', 'login', 'detail'];
const ITEMS_PER_PAGE = 8;

function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return VALID_PAGES.includes(hash) ? hash : 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Notification State
  const [notification, setNotification] = useState(null);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // Helper: Navigation
  const navigate = (page, product = null) => {
    setCurrentPage(page);
    setSelectedProduct(product);
    
    const hash = page === 'detail' && product ? `product/${product._id || product.id}` : page;
    history.pushState({ page, product }, '', '#' + hash);
    
    window.scrollTo(0, 0);
  };

  // Popstate Listener
  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState({ page: 'home' }, '', '#home');
    }

    const handlePopState = (e) => {
      const hash = window.location.hash.slice(1);
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
        setSelectedProduct(e.state.product || null);
      } else if (hash.startsWith('product/')) {
        const id = hash.split('/')[1];
        const product = MOCK_PRODUCTS.find(p => String(p.id || p._id) === id);
        if (product) {
          setCurrentPage('detail');
          setSelectedProduct(product);
        } else {
          setCurrentPage('home');
        }
      } else if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simulation of Initial Loading
  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(id);
  }, []);

  // Utility: Show Notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    navigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    showNotification('Logged out successfully', 'info');
    navigate('home');
  };

  // Filtering Pipeline
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (pageNum - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, pageNum]);

  useEffect(() => {
    setPageNum(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy]);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginForm 
            onLogin={handleLogin} 
            onCancel={() => navigate('home')} 
            showNotification={showNotification}
          />
        );
      case 'detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            isLoggedIn={isLoggedIn} 
            showNotification={showNotification}
          />
        ) : (
          <HomePage 
            products={MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 3)} 
            onSelectProduct={(p) => navigate('detail', p)}
            onShopNow={() => navigate('products')}
          />
        );
      case 'products':
        return (
          <ProductList 
            products={paginatedProducts}
            totalProducts={filteredProducts.length}
            currentPage={pageNum}
            totalPages={totalPages}
            onPageChange={setPageNum}
            onSelectProduct={(p) => navigate('detail', p)}
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
      case 'home':
      default: {
        const featured = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 3);
        const homeProducts = featured.length > 0 ? featured : MOCK_PRODUCTS.slice(0, 3);
        return (
          <HomePage 
            products={homeProducts} 
            onSelectProduct={(p) => navigate('detail', p)}
            onShopNow={() => navigate('products')}
          />
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout}
        onNavigate={navigate}
        currentPage={currentPage}
      />
      <main className="main-content">
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
