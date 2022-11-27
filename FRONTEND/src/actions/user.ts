import Swal from 'sweetalert2';

import { fetchWithToken } from '../helpers/fetch';

import { Details } from '../interfaces/user';
import { types } from '../types/types';

import { signout } from './auth';

export const initializeLoadUsuario = (usuario_id: number): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios/${usuario_id}`, {});
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         dispatch(loadUser(resultado.details));
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}

const loadUser = (details: Details): any => ({
   type: types.loadUser,
   payload: { details: details }
});

export const initializeDeleteUsuario = (): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios`, {}, 'DELETE');
      const { ok, msg } = await resp.json();

      if (ok) {
         localStorage.clear();
         dispatch(signout())

         Swal.fire('Gracias', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}