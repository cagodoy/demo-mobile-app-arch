import { applyMiddleware, createStore, compose } from 'redux';
import middleware from './middleware';
import AppReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import EpicMiddleware, { epics } from './middleware/epics';

const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(AppReducer, /* preloadedState, */ composeEnhancers(...enhancers));

EpicMiddleware.run(epics);

export default store;
