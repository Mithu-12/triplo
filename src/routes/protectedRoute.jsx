import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation,  } from 'react-router-dom';

// Custom protected route component
function ProtectedRoute({ children }) {
  const location = useLocation()
  const isAuthenticated = useSelector(state => state.auth.user);
  if(isAuthenticated){
    return children
  }
  return <Navigate to='/login' state={{from: location}} replace/>
}

export default ProtectedRoute;
