import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeLoadUsuario } from '../../../actions/user';

const HomePage = () => {

   const dispatch = useDispatch();
   const { auth, user } = useSelector((state: any) => state);
   const { details } = user;

   useEffect(() => {
      if (Object.keys(details).length === 0) {
         dispatch(initializeLoadUsuario(auth?.usuario_id))
      }
   }, [dispatch, auth, details]);

   return (
      <>
         <div className="container">
            <br />
            <h1>Bienvenido {details.nombre}</h1>

            <br />
            <div className="card p-2">

               <h2>My sitio</h2>

               <p>Prueba tecnica WEB Full Stack</p>
            </div>
         </div>
      </>
   )
}

export default HomePage;