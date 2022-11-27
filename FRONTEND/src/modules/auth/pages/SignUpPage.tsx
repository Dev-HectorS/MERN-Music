import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { initializeSignUpEmail } from '../../../actions/auth';

const SignUpPage = () => {

   const dispatch = useDispatch();

   return (
      <>
         <div className="container vh-100">
            <div className="row justify-content-center align-items-center h-100">
               <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                  <div className="card shadow-lg">
                     <div className="card-body p-5">
                        <h1 className="fs-4 card-title fw-bold mb-4">Crear Nueva Cuenta</h1>

                        <Formik
                           initialValues={{
                              nombre: '',
                              apaterno: '',
                              amaterno: '',
                              telefono: '',
                              usuario: '',
                              genero: '',
                              fecha_nacimiento: '',
                              password: '',
                           }}
                           onSubmit={({ ...rest }) => {
                              dispatch(initializeSignUpEmail(rest))
                           }}
                           validationSchema={
                              Yup.object({
                                 nombre: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 apaterno: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 amaterno: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 telefono: Yup.string()
                                    .min(10, 'Este campo no cumple con 10 digitos')
                                    .max(10, 'Este campo no cumple con 10 digitos')
                                    .required('Este campo es obligatorio'),
                                 genero: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 usuario: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 fecha_nacimiento: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 password: Yup.string()
                                    .min(6, 'Este campo debe contener al menos 6 caracteres')
                                    .required('Este campo es obligatorio'),
                              })
                           }
                           enableReinitialize={true}
                        >
                           {(formik) => (
                              <Form >
                                 <label htmlFor="nombre">Nombre</label>
                                 <Field type="text" className="form-control" name="nombre" />
                                 <ErrorMessage name="nombre" component="span" />

                                 <label htmlFor="apaterno">Apellido Paterno</label>
                                 <Field type="text" className="form-control" name="apaterno" />
                                 <ErrorMessage name="apaterno" component="span" />

                                 <label htmlFor="amaterno">Apellido Materno</label>
                                 <Field type="text" className="form-control" name="amaterno" />
                                 <ErrorMessage name="amaterno" component="span" />

                                 <label htmlFor="telefono">Telefono</label>
                                 <Field type="text" className="form-control" name="telefono" />
                                 <ErrorMessage name="telefono" component="span" />

                                 <label htmlFor="genero">Genero</label>
                                 <Field className="form-select" as="select" name="genero" >
                                    <option value="">Seleccione su genero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                 </Field>
                                 <ErrorMessage name="genero" component="span" />

                                 <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                                 <Field type="date" className="form-control" name="fecha_nacimiento" />
                                 <ErrorMessage name="fecha_nacimiento" component="span" />

                                 <label htmlFor="usuario">Usuario</label>
                                 <Field type="text" className="form-control" name="usuario" />
                                 <ErrorMessage name="usuario" component="span" />

                                 <label htmlFor="password">Contrasena</label>
                                 <Field type="password" className="form-control" name="password" />
                                 <ErrorMessage name="password" component="span" />

                                 <br />
                                 <div className="row">
                                    <div className="col align-self-center">
                                       <Link to="sign-in">
                                          Iniciar sesión
                                       </Link>
                                    </div>
                                    <div className="col text-end">
                                       <button type="submit" className="btn btn-primary">Registrar</button>
                                    </div>
                                 </div>
                              </Form>
                           )}
                        </Formik>


                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUpPage;