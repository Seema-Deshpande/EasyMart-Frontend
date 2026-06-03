import { useState } from 'react';
import { MOCK_PRODUCTS } from '../../data/products';
import Notification from '../../component/common/Notification';

const AdminProductsPage = () => {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [notification, setNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', category: '', price: '', stock: '', description: '', isFeatured: false
    });

    const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            isFeatured: product.isFeatured || false
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // TODO: Call DELETE API
            setProducts(products.filter(p => (p._id || p.id) !== id));
            showNotification('Product deleted successfully', 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Call POST/PUT API
        if (editingProduct) {
            setProducts(products.map(p => 
                (p._id || p.id) === (editingProduct._id || editingProduct.id) 
                ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) } 
                : p
            ));
            showNotification('Product updated successfully', 'success');
        } else {
            const newProduct = {
                ...formData,
                _id: Date.now().toString(),
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                rating: 0,
                numReviews: 0
            };
            setProducts([newProduct, ...products]);
            showNotification('Product added successfully', 'success');
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', category: '', price: '', stock: '', description: '', isFeatured: false });
    };

    return (
        <div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h2 className="fw-bold mb-0">Products Management</h2>
                <button className="btn btn-primary shadow-sm" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
                    <i className="bi bi-plus-lg me-2"></i> Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                    <div className="row g-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0 ps-0" 
                                    placeholder="Search products by name..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select" 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product._id || product.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <img 
                                                  src={(product.images && product.images[0]) || product.image || 'https://via.placeholder.com/40'} 
                                                  alt="" 
                                                  className="rounded me-3" 
                                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                                  onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=P'}
                                                />
                                                <div>
                                                    <span className="fw-bold d-block">{product.name}</span>
                                                    {product.isFeatured && <span className="badge bg-warning text-dark tiny-badge" style={{ fontSize: '0.65rem' }}>Featured</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td className="fw-semibold text-primary">${product.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${product.stock < 10 ? 'bg-danger text-white' : 'bg-success text-white'} rounded-pill px-3`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-primary me-2 shadow-sm" onClick={() => handleEdit(product)} title="Edit">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger shadow-sm" onClick={() => handleDelete(product._id || product.id)} title="Delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            <i className="bi bi-search display-6 mb-3 d-block opacity-25"></i>
                                            No products found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="fw-bold mb-0">{editingProduct ? 'Edit Product' : 'Add New Product'}</h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)}></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase">Product Name</label>
                                        <input type="text" className="form-control" placeholder="e.g. Wireless Headphones" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-uppercase">Category</label>
                                            <input type="text" className="form-control" placeholder="e.g. Electronics" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-uppercase">Price ($)</label>
                                            <input type="number" step="0.01" className="form-control" placeholder="0.00" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-uppercase">Stock Quantity</label>
                                            <input type="number" className="form-control" placeholder="0" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                                        </div>
                                        <div className="col-md-6 d-flex align-items-end">
                                            <div className="form-check form-switch mb-2">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="isFeatured" 
                                                    checked={formData.isFeatured} 
                                                    onChange={e => setFormData({...formData, isFeatured: e.target.checked})} 
                                                />
                                                <label className="form-check-label fw-bold" htmlFor="isFeatured">Featured</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label fw-bold small text-uppercase">Description</label>
                                        <textarea className="form-control" rows="3" placeholder="Enter product details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 pt-0">
                                    <button type="button" className="btn btn-light px-4" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4 shadow-sm">{editingProduct ? 'Update Product' : 'Save Product'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
