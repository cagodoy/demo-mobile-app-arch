import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { LIST_HISTORY_BY_USER_ID, listHistoryByUserIdFailure, listHistoryByUserIdSuccess } from './history.state';
import ENV from '../../../env';

const GRAPHQL_API_URL = ENV.API_URL;

export const listHistoryByUserIdEpic = (action$, state$) =>
  action$.pipe(
    ofType(LIST_HISTORY_BY_USER_ID),
    mergeMap((action) => {
      const token = state$.value.auth.getIn(['user', 'token']);
      if (token == null) {
        const err = new Error('token is null');
        console.log(err);
        return of(listHistoryByUserIdFailure(err));
      }

      const query = `
				{
					listHistoryByUserId {
						data {
							id
							userId
							latitude
              longitude
              createdAt
						}
						error {
							code
							message
						}
					}
				}
			`;

      return request({
        method: 'POST',
        url: GRAPHQL_API_URL,
        body: JSON.stringify({ query }),
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).pipe(
        map(({ response }) => {
          if (response.data.listHistoryByUserId.error !== null) {
            throw new Error(response.data.listHistoryByUserId.error.message);
          }
          return listHistoryByUserIdSuccess(response.data.listHistoryByUserId);
        }),
        catchError((err) => of(listHistoryByUserIdFailure(err))),
      );
    }),
  );

export default combineEpics(listHistoryByUserIdEpic);
