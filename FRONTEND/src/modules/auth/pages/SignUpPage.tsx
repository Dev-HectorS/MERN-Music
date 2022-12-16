import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { WavyLink } from 'react-wavy-transitions';

import { initializeSignUpEmail } from '../../../actions/auth';

const SignUpPage = () => {

   const dispatch = useDispatch();

   return (
      <>
         <div className="container vh-100">
            <div className="row justify-content-center align-items-center h-100">
               <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-9 col-sm-9">
                  <div className="card login__card shadow-lg">
                     <div className="card-body p-5">
                        <h3 className="login__title">Crear Nueva Cuenta</h3>

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
                                 <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="nombre" className="login_label">Nombre(s)</label>
                                       <Field required type="text" className="login__input" name="nombre" placeholder="Ingrese su nombre(s)" />
                                       <ErrorMessage name="nombre" component="span" className="login__span" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="apaterno" className="login_label">Apellido Paterno</label>
                                       <Field required type="text" className="login__input" name="apaterno" placeholder="Ingrese su apellido paterno" />
                                       <ErrorMessage name="apaterno" component="span" className="login__span" />
                                    </div>
                                 </div>

                                 <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="amaterno" className="login_label">Apellido Materno</label>
                                       <Field required type="text" className="login__input" name="amaterno" placeholder="Ingrese su apellido materno" />
                                       <ErrorMessage name="amaterno" component="span" className="login__span" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="telefono" className="login_label">Telefono</label>
                                       <Field required type="text" className="login__input" name="telefono" placeholder="xxxxxxxxxx" />
                                       <ErrorMessage name="telefono" component="span" className="login__span" />
                                    </div>
                                 </div>

                                 <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="genero" className="login_label">Genero</label>
                                       <Field required className="login__input" as="select" name="genero" >
                                          <option value="">Seleccione su genero</option>
                                          <option value="M">Masculino</option>
                                          <option value="F">Femenino</option>
                                       </Field>
                                       <ErrorMessage name="genero" component="span" className="login__span" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                       <label htmlFor="fecha_nacimiento" className="login_label">Fecha de nacimiento</label>
                                       <Field required type="date" className="login__input" name="fecha_nacimiento" />
                                       <ErrorMessage name="fecha_nacimiento" component="span" className="login__span" />
                                    </div>
                                 </div>

                                 <div className="row g-3">
                                    <div className="col-12 col-lg-6">
                                       <label htmlFor="usuario" className="login_label">Usuario</label>
                                       <Field required type="text" className="login__input" name="usuario" placeholder="Ingrese su usuario" />
                                       <ErrorMessage name="usuario" component="span" className="login__span" />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                       <label htmlFor="password" className="login_label">Contrasena</label>
                                       <Field required type="password" className="login__input" name="password" placeholder="**********" />
                                       <ErrorMessage name="password" component="span" className="login__span" />
                                    </div>
                                 </div>
                                 <hr />

                                 <div className="login__buttons">
                                    <WavyLink direction="down" duration={1000} to="sign-in" color="#ffffff">
                                       Iniciar sesión
                                    </WavyLink>
                                    <button type="submit" className="login__button">Registrar</button>
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