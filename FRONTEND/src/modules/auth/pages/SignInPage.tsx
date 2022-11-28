import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { WavyLink } from 'react-wavy-transitions';

import { initializeSignInEmail } from '../../../actions/auth';

const SignInPage = () => {

   const dispatch = useDispatch();

   return (
      <>
         <div className="container vh-100">
            <div className="row justify-content-center align-items-center h-100">
               <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                  <div className="card login__card shadow-lg">
                     <div className="card-body p-5">
                        <h3 className="login__title">Iniciar sesión</h3>
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
                                 <label htmlFor="usuario" className="login_label">Usuario</label>
                                 <Field required type="text" className="login__input" name="usuario" placeholder="Ingrese su usuario" />
                                 <ErrorMessage name="usuario" component="span" className="login__span" />
                                 <br />

                                 <label htmlFor="password" className="login_label">Contraseña</label>
                                 <Field required type="password" className="login__input" name="password" placeholder="Ingrese su contraseña" />
                                 <ErrorMessage name="password" component="span" className="login__span" />
                                 <br />

                                 <hr />
                                 <div className="login__buttons">
                                    <button type="submit" className="login__button">Iniciar sesión</button>
                                    <WavyLink direction="up" duration={1000} to="../sign-up" color="#4430CD" className="login__button login__button_border">
                                       Crear cuenta
                                    </WavyLink>
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