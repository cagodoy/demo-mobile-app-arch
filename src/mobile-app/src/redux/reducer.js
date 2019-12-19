import { Map } from 'immutable';
import { combineReducers } from 'redux';

import SessionReducer from '../modules/session/session.state';
import NavigatorReducer from '../navigation/navigator.state';
import AuthReducer from '../modules/auth/auth.state';
import RestaurantsReducer from '../modules/restaurants/restaurants.state';
import HistoryReducer from '../modules/history/history.state';

const reducers = {
  session: SessionReducer,
  nav: NavigatorReducer,
  auth: AuthReducer,
  restaurants: RestaurantsReducer,
  history: HistoryReducer,
};

const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : void 0);
const setImmutable = (child, key, value) => child.set(key, value);

const AppReducer = combineReducers(reducers, immutableStateContainer, getImmutable, setImmutable);

export default AppReducer;
