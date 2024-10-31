import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Assuming AuthContext provides isLoggedIn

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the children (login/signup components)
  return children;
};

export default PublicRoute;
