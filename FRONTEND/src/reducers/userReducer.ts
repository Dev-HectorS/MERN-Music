import { Music } from '../interfaces/user';
import { types } from '../types/types';

const initialState = {
   details: {},
   gustos: {
      music: []
   },
   active: null
}

export const userReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case types.loadUser:
         return {
            ...state,
            ...action.payload
         }

      case types.loadGustoMusic:
         return {
            ...state,
            gustos: {
               ...action.payload
            }
         }

      case types.createGustoMusic:
         return {
            ...state,
            gustos: {
               ...state,
               music: [
                  ...state.gustos.music,
                  action.payload
               ]
            }
         }

      case types.updateGustoMusic:
         return {
            ...state,
            gustos: {
               ...state.gustos,
               music: state.gustos.music.map(
                  (m: Music) => (m.mi_musica_id === action.payload.mi_musica_id) ? action.payload : m
               )
            }
         }

      case types.deleteGustoMusic:
         return {
            ...state,
            gustos: {
               ...state.gustos,
               music: state.gustos.music.filter((music: Music) => music?.mi_musica_id !== action.payload)
            }
         }

      case types.activeGusto:
         return {
            ...state,
            active: action.payload
         }

      default:
         return state;
   }
};