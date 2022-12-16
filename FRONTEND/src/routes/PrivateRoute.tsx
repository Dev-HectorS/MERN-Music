import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeLoadAuth } from '../actions/auth';

interface PrivateRouteProps {
   children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

   const dispatch = useDispatch();
   const { logging, usuario_id } = useSelector((state: any) => state.auth);

   useEffect(() => {
      dispatch(initializeLoadAuth());
   }, [dispatch])

   if (logging) {
      return (
         <>
            <h1>Loading...</h1>
         </>
      )
   }
   return !!usuario_id
      ? children
      : <Navigate to="/auth/login" />
}

export default PrivateRoute;