import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
   auth: authReducer
});

export const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(thunk))
);