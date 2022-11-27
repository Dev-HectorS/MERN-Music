import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({});

export const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(thunk))
);