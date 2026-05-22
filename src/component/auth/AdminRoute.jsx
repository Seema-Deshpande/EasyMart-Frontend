import { Navigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
