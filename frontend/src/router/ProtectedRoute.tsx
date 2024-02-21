import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from 'src/context/auth/AuthContext';

export const ProtectedRoute = () => {
  const { token } = useAuthContext();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to='/login' />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
