import { createEpicMiddleware, combineEpics } from 'redux-observable';

import auth from '../../modules/auth/auth.epic';
import restaurants from '../../modules/restaurants/restaurants.epic';
import history from '../../modules/history/history.epic';

export const epics = combineEpics(auth, restaurants, history);

export default createEpicMiddleware();
