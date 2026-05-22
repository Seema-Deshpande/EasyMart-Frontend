const AdminUsersPage = () => {
    const mockUsers = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'user', joined: '2024-01-15' },
        { id: 2, name: 'Admin User', email: 'admin@easymart.com', role: 'admin', joined: '2023-12-01' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', joined: '2024-02-10' },
        { id: 4, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', joined: '2024-03-05' }
    ];

    return (
        <div>
            <h2 className="fw-bold mb-4">Users Management</h2>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3">User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined Date</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-3 font-weight-bold">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.joined).toLocaleDateString()}</td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-secondary me-2">View</button>
                                            <button className="btn btn-sm btn-outline-danger" disabled={user.role === 'admin'}>Disable</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
