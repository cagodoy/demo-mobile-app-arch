import { createLogger } from 'redux-logger';

// log actions in development mode
export default createLogger({
  collapsed: true,

  // only log in development mode
  predicate: () => __DEV__,

  // transform immutable state to plain objects
  // stateTransformer: state => state.toJS(),
  stateTransformer: (state) => {
    return Object.keys(state).reduce((obj, key, index) => {
      obj[key] = key === 'nav' || key === 'socket' ? state[key] : state[key].toJS();
      return obj;
    }, {});
  },

  // transform immutable action payloads to plain objects
  actionTransformer: (action) => ({ ...action, payload: action.payload }),
});
