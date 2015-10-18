import {createStore, compose} from 'redux';
import {devTools} from 'redux-devtools';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const finalCreateStore = compose(devTools())(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
