// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // Redirige al login si no hay token
    console.log('no token')
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
