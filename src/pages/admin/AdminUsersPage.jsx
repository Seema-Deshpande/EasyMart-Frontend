import { useState, useEffect } from 'react';
import * as userService from '../../service/userService';
import { adminUpdateUserRole, adminDeleteUser } from '../../service/adminService';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error('Fetch users error:', err);
            setError(err.message || 'Failed to load users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            await adminUpdateUserRole(userId, newRole);
            setUsers(users.map(u => (u._id === userId || u.id === userId) ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminDeleteUser(userId);
                setUsers(users.filter(u => (u._id !== userId && u.id !== userId)));
            } catch (err) {
                alert('Failed to delete user');
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-4 text-center">Loading users...</div>;
    if (error) return <div className="alert alert-danger m-4">{error}</div>;

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Users Management</h2>
            </div>

            {/* Search Bar */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted">
                            <i className="bi bi-search"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-start-0 ps-0" 
                            placeholder="Search users by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined Date</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={user._id || user.id}>
                                        <td className="px-4 text-muted small">{index + 1}</td>
                                        <td>
                                            <div className="fw-bold text-dark">{user.name}</div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-muted small">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                    Manage
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                                    <li>
                                                        <button 
                                                            className="dropdown-item" 
                                                            onClick={() => handleRoleUpdate(user._id, user.role === 'admin' ? 'user' : 'admin')}
                                                        >
                                                            Switch to {user.role === 'admin' ? 'User' : 'Admin'}
                                                        </button>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button 
                                                            className="dropdown-item text-danger" 
                                                            onClick={() => handleDeleteUser(user._id)}
                                                        >
                                                            Delete User
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
