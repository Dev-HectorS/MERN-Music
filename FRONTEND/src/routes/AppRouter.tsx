import {
   BrowserRouter,
   Routes,
   Route,
   Outlet,
} from 'react-router-dom';
import { WavyContainer } from 'react-wavy-transitions';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import AuthRouter from '../modules/auth/AuthRouter';
import GustosRouter from '../modules/app/GustosRouter';

export const AppRouter = () => {
   return (
      <>
         <BrowserRouter>
            <WavyContainer />
            <Outlet />

            <Routes>
               <Route path="auth/*" element={
                  <PublicRoute>
                     <AuthRouter />
                  </PublicRoute>
               } />

               <Route path="/*" element={
                  <PrivateRoute>
                     <GustosRouter />
                  </PrivateRoute>
               } />
            </Routes>
         </BrowserRouter>
      </>
   )
}
