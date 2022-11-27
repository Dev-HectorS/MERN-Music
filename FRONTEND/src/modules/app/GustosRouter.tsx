import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HomePage, ProfilePage, GustosPage } from './pages';

import { initializeSignOut } from '../../actions/auth';

export const GustosRouter = () => {

   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(initializeSignOut())
   }
   return (
      <>
         <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
               <Link className="navbar-brand" to="/">Navbar</Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                     </li>
                     <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           Mis Gustos
                        </Link>
                        <ul className="dropdown-menu">
                           <li>
                              <NavLink className="dropdown-item" to="/gustos">Mi Music</NavLink>
                           </li>
                        </ul>
                     </li>
                  </ul>
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
               </div>
            </div>
         </nav>

         <Routes>
            <Route path="gustos" element={<GustosPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="home" />} />
         </Routes>
      </>
   )
}

export default GustosRouter;