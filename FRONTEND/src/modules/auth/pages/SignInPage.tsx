import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { initializeSignInEmail } from '../../../actions/auth';

const SignInPage = () => {

   const dispatch = useDispatch();

   return (
      <>
         <div className="container vh-100">
            <div className="row justify-content-center align-items-center h-100">
               <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                  <div className="card shadow-lg">
                     <div className="card-body p-5">
                        <h1 className="fs-4 card-title fw-bold mb-4">Iniciar sesión</h1>
                        <Formik
                           initialValues={{
                              usuario: '',
                              password: '',
                           }}
                           onSubmit={(values) => {
                              dispatch(initializeSignInEmail(values))
                           }}
                           validationSchema={
                              Yup.object({
                                 usuario: Yup.string()
                                    .required('Este campo es obligatorio'),
                                 password: Yup.string()
                                    .required('Este campo es obligatorio'),
                              })
                           }
                           enableReinitialize={true}
                        >
                           {(formik) => (
                              <Form >
                                 <label htmlFor="usuario" className="form-label">Usuario</label>
                                 <Field type="text" className="form-control" name="usuario" />
                                 <ErrorMessage name="usuario" component="span" />

                                 <label htmlFor="password" className="form-label">Contrasena</label>
                                 <Field type="password" className="form-control" name="password" />
                                 <ErrorMessage name="password" component="span" className="" />

                                 <br />
                                 <div className="row">
                                    <div className="col">
                                       <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                    </div>
                                    <div className="col align-self-center text-end">
                                       <Link to="../sign-up" color="#8f44fd">
                                          Crear cuenta
                                       </Link>
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

export default SignInPage;