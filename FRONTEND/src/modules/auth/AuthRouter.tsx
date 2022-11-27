import { Navigate, Routes, Route } from 'react-router-dom';

import { SignInPage, SignUpPage } from './pages';

const AuthRouter = () => {
   return (
      <>
         <Routes>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="/*" element={<Navigate to="sign-in" replace />} />
         </Routes>
      </>
   )
}

export default AuthRouter;