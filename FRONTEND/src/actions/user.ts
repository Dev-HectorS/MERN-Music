import Swal from 'sweetalert2';

import { fetchWithToken } from '../helpers/fetch';

import { Details, Music } from '../interfaces/user';
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

export const initializeGustoMusic = (usuario_id: number): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios/gustos/${usuario_id}`, {});
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         const { music } = resultado.gustos;

         dispatch(loadGustoMusic(music));
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}

const loadGustoMusic = (musics: any) => ({
   type: types.loadGustoMusic,
   payload: { music: musics }
});

export const initializeAddMusic = (music: Music): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios/gustos`, music, 'POST');
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         dispatch(createGustoMusic(resultado.music))

         Swal.fire('Felicidades', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}

const createGustoMusic = (music: Music) => ({
   type: types.createGustoMusic,
   payload: music
});

export const initializeUpdateMusic = (music: Music): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios/gustos/${music.mi_musica_id}`, music, 'PUT');
      const { ok, msg, resultado } = await resp.json();

      if (ok) {
         console.log(resultado.music);
         dispatch(updateGustoMusic(resultado.music))

         Swal.fire('Felicidades', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}

const updateGustoMusic = (music: Music) => ({
   type: types.updateGustoMusic,
   payload: music
});

export const initializeDeleteMusic = (mi_musica_id?: number): any => {
   return async (dispatch: any) => {
      const resp = await fetchWithToken(`usuarios/gustos/${mi_musica_id}`, {}, 'DELETE');
      const { ok, msg } = await resp.json();

      if (ok) {
         dispatch(deleteGustoMusic(mi_musica_id))

         Swal.fire('Felicidades', msg, 'success');
      } else {
         Swal.fire('Error', msg, 'error');
      }
   }
}

const deleteGustoMusic = (mi_musica_id?: number) => ({
   type: types.deleteGustoMusic,
   payload: mi_musica_id
});

export const initializeActiveGusto = (music: Music): any => {
   return async (dispatch: any) => {
      dispatch(activeMusic(music))
   }
}

const activeMusic = (music: any) => ({
   type: types.activeGusto,
   payload: music
});
