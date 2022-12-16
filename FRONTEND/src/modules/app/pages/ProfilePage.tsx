import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { initializeLoadUsuario, initializeDeleteUsuario } from '../../../actions/user';

import { ageFormat } from '../helpers/ageFormat';

import userImg from '../images/user.png';

const ProfilePage = () => {

   const dispatch = useDispatch();
   const { auth, user } = useSelector((state: any) => state);
   const { details } = user;

   useEffect(() => {
      if (Object.keys(details).length === 0) {
         dispatch(initializeLoadUsuario(auth?.usuario_id))
      }
   }, [dispatch, auth, details]);

   const handleDeleteAcccount = () => {
      Swal.fire({
         title: '¿Estás seguro?',
         text: "¡No podrás revertir esto!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, eliminar!',
         cancelButtonText: 'Cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(initializeDeleteUsuario())
         }
      })
   }

   return (
      <>
         <div className="container">
            <br />
            <div className="row">
               <div className="col-6 d-flex align-items-center">
                  <img src={userImg} alt="user-pic" height={40} />
                  <h1 className="px-2 profile__name">{details.nombre}</h1>
               </div>
               <div className="col-6 align-self-center text-end">
                  <button className="btn btn-danger" onClick={handleDeleteAcccount}>Eliminar mi cuenta</button>
               </div>
            </div>
            <br />
            <div className="app__card">
               <h2>Mi información</h2>
               <h5>{details.nombre}</h5>
               <h5>{(details.genero === 'M') ? 'Masculino' : 'Femenino'}</h5>
               <h5>{ageFormat(details.fecha_nacimiento)} años</h5>
            </div>
         </div>
      </>
   )
}

export default ProfilePage;