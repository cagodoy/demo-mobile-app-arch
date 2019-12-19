// import loggerMiddleware from './logger';
import epicsMiddleware from './epics';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const reduxMiddleware = createReactNavigationReduxMiddleware((state) => state.nav);

export default [
  // loggerMiddleware,
  epicsMiddleware,
  reduxMiddleware,
];
