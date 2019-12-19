import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import {
  LIST_RESTAURANTS_BY_COORD,
  listRestaurantsByCoordFailure,
  listRestaurantsByCoordSuccess,
} from './restaurants.state';
import ENV from '../../../env';

const GRAPHQL_API_URL = ENV.API_URL;

export const listRestaurantsByCoordEpic = (action$, state$) =>
  action$.pipe(
    ofType(LIST_RESTAURANTS_BY_COORD),
    mergeMap((action) => {
      const { latitude, longitude } = action.payload;

      const token = state$.value.auth.getIn(['user', 'token']);
      if (token == null) {
        const err = new Error('token is null');
        console.log(err);
        return of(listRestaurantsByCoordFailure(err));
      }

      const query = `
				query ($input: ListRestaurantByCoordInput!) {
					listRestaurantsByCoord(input: $input) {
						data {
							id
							name
							rating
							address
							open
							photoReference
							coord {
								latitude
								longitude
							}
						}
						error {
							code
							message
						}
					}
				}
      `;

      const variables = {
        input: {
          latitude,
          longitude,
        },
      };

      return request({
        method: 'POST',
        url: GRAPHQL_API_URL,
        body: JSON.stringify({ query, variables }),
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).pipe(
        map(({ response }) => {
          if (response.data.listRestaurantsByCoord.error !== null) {
            throw new Error(response.data.listRestaurantsByCoord.error.message);
          }
          return listRestaurantsByCoordSuccess(response.data.listRestaurantsByCoord);
        }),
        catchError((err) => of(listRestaurantsByCoordFailure(err))),
      );
    }),
  );

export default combineEpics(listRestaurantsByCoordEpic);
