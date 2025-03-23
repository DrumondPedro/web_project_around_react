import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, publicRoute = false }) {
  const location = useLocation();
  const from = location.state?.from || '/';

  const [isLogged, setIslogged] = useState(false);

  if (publicRoute && isLogged) {
    return <Navigate to={from} />;
  }

  if (!publicRoute && !isLogged) {
    return <Navigate to={'/signin'} state={{ from: location.pathname }} />;
  }
  return children;
}

export default ProtectedRoute;
