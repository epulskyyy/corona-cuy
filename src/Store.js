import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from './Reducers';
const middleware = applyMiddleware(thunk, promise, logger);

const Store = createStore(RootReducer, composeWithDevTools(middleware));

export default Store;
