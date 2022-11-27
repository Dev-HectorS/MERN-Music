import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';

import { NewUsuario, LoginUsuario } from '../interfaces/auth';
import { types } from '../types/types';

export const initializeSignUpEmail = (usuario: NewUsuario): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithoutToken(`usuarios`, usuario, 'POST')
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         localStorage.setItem('token', resultado.token);

         const usuario_id = resultado.usuario_id;
         dispatch(activeSignIn(usuario_id));

         Swal.fire('Sesión Existo', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
};

export const initializeSignInEmail = (usuario: LoginUsuario): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithoutToken(`usuarios/auth/sign-in`, usuario, 'POST')
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         localStorage.setItem('token', resultado.token);

         const usuario_id = resultado.usuario_id;
         dispatch(activeSignIn(usuario_id));

         Swal.fire('Sesión Existo', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
};

export const initializeLoadAuth = (): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken('usuarios/auth/renew', {});
      const { ok, resultado } = await resp.json();

      if (ok) {
         localStorage.setItem('token', resultado.token);

         const usuario_id = resultado.usuario_id;
         dispatch(activeSignIn(usuario_id));
      } else {
         dispatch(loginState());
      }
   }
};

export const activeSignIn = (usuario_id: number) => ({
   type: types.activeSignIn,
   payload: { usuario_id: usuario_id }
});

const loginState = () => ({
   type: types.authLoginState
});

export const initializeSignOut = (): any => {
   return async (dispatch: any) => {
      localStorage.clear();
      dispatch(signout())

      Swal.fire('Sesión Cerrada Correctamente', '', 'success');
   }
};

export const signout = () => ({
   type: types.signout
});