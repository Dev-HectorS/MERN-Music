import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { XSquareFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { Music } from '../../../interfaces/user';
import { initializeActiveGusto, initializeAddMusic, initializeGustoMusic, initializeUpdateMusic, initializeDeleteMusic } from '../../../actions/user';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

const GustosPage = () => {

   const [form, setForm] = useState({
      name: '',
      author: '',
   })

   const dispatch = useDispatch();

   const { auth, user } = useSelector((state: any) => state);
   const { gustos, active } = user;
   const musics = gustos['music'];

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const load = useRef(0);

   useEffect(() => {
      if (musics.length === 0 && load.current === 0) {
         dispatch(initializeGustoMusic(auth?.usuario_id));
         load.current = 1;
      }

      if (active !== null) {
         setForm(active)
      }
   }, [dispatch, active, auth, musics]);

   const handleEditMusic = (music: Music) => {
      dispatch(initializeActiveGusto(music))
      setModalIsOpen(true);
   }

   const handleDeleteMusic = (mi_music_id?: number) => {
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
            dispatch(initializeDeleteMusic(mi_music_id))
         }
      })
   }

   const openModal = () => {
      setModalIsOpen(true);
   }

   const closeModal = () => {
      setModalIsOpen(false);
   }

   return (
      <>
         <div className="container">
            <br />
            <div className="row">
               <div className="col-6">
                  <h1>Mi música</h1>
               </div>
               <div className="col-6 text-end">
                  <button className="btn btn-primary" onClick={openModal}>Agregar</button>
               </div>
            </div>
            <br />
            <div>
               {
                  musics.length === 0
                     ?
                     <div>
                        No music
                     </div>
                     :
                     <div className="row">
                        {
                           musics.map((music: Music) => (
                              <div className="col-6 col-lg-4">
                                 <div className="card m-1">
                                    <div className="p-2">
                                       <h5>{music?.name}</h5>
                                       <p>Autor: {music?.author}</p>
                                    </div>
                                    <div className="d-flex justify-content-between p-1">
                                       <button className="btn" onClick={() => handleEditMusic(music)}>Editar</button>
                                       <button className="btn btn-danger" onClick={() => handleDeleteMusic(music?.mi_musica_id)}>Eliminar</button>
                                    </div>
                                 </div>
                              </div>
                           ))
                        }
                     </div>
               }
            </div>

            <Modal
               appElement={document.getElementById('root') as HTMLElement}
               isOpen={modalIsOpen}
               contentLabel="Example Modal"
               closeTimeoutMS={200}
               style={customStyles}
            >
               <div className="row">
                  <div className="col text-end">
                     <XSquareFill onClick={closeModal} />
                  </div>
               </div>

               <Formik
                  initialValues={form}
                  onSubmit={(music: Music) => {
                     if (active !== null) {
                        dispatch(initializeUpdateMusic(music));
                     } else {
                        dispatch(initializeAddMusic(music));
                     }
                     closeModal();
                  }}
                  validationSchema={
                     Yup.object({
                        name: Yup.string()
                           .required('Este campo es obligatorio'),
                        author: Yup.string()
                           .required('Este campo es obligatorio'),
                     })
                  }
                  enableReinitialize={true}
               >
                  <Form>
                     <label htmlFor="name" className="form-label">Name</label>
                     <Field type="text" className="form-control" name="name" />
                     <ErrorMessage name="name" component="span" />

                     <label htmlFor="author" className="form-label">Author</label>
                     <Field type="text" className="form-control" name="author" />
                     <ErrorMessage name="author" component="span" />

                     <br />
                     <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Agregar</button>
                     </div>
                  </Form>
               </Formik>
            </Modal>
         </div>
      </>
   )
}

export default GustosPage;