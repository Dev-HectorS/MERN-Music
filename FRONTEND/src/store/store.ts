import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { authReducer, userReducer } from '../reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
   auth: authReducer,
   user: userReducer,
});

export const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(thunk))
);