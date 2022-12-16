import { types } from '../types/types';

const initialState = {
   logging: true
}

export const authReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case types.activeSignIn:
         return {
            ...state,
            ...action.payload,
            logging: false,
         };

      case types.authLoginState:
         return {
            ...state,
            logging: false,
         };

      case types.signout:
         return {
            logging: false
         };

      default:
         return state;
   }
};