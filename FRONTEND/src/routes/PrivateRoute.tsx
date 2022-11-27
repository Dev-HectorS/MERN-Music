import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
   children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
   return false
      ? children
      : <Navigate to="/auth/login" />
}

export default PrivateRoute;