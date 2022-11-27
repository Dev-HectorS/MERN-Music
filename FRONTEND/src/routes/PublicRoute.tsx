import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeLoadAuth } from '../actions/auth';

interface PublicRouteProps {
   children: JSX.Element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {

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
      ? <Navigate to="/" />
      : children
}

export default PublicRoute;