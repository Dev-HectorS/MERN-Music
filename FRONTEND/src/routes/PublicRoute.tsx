import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
   children: JSX.Element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
   return false
      ? <Navigate to="/" />
      : children
}

export default PublicRoute;