import { createStore, compose, composeEnhancers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import createReducer from 'popup/reducers/createReducer';
import rootSaga from 'popup/sagas';

// Use configureStore to avoid collision of name with Redux createStore
const configureStore = (initialState = {}) => {
  // Middelware
  // TODO: Remove thunk in the future
  const sagaMiddleware = createSagaMiddleware();
  let middleware = [sagaMiddleware];
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'devbuild') {
    // Do not require the module unless in development
    const { logger } = require('redux-logger');
    middleware.push(logger);
  }

  // Enhancers
  let enhancers = [];
  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware)
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
