import { types } from '../types/types';

const initialState = {
   details: {},
   gustos: {},
   active: null
}

export const userReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case types.loadUser:
         return {
            ...state,
            ...action.payload
         }

      default:
         return state;
   }
};