import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { SIGN_UP, signUpFailure, signUpSuccess, LOGIN, loginFailure, loginSuccess } from './auth.state';
import ENV from '../../../env';

const GRAPHQL_API_URL = ENV.API_URL;

export const signUpEpic = (action$) =>
  action$.pipe(
    ofType(SIGN_UP),
    mergeMap((action) => {
      const { name, email, password } = action.payload;

      const query = `
        mutation ($input: SignUpInput!) {
          signup(input: $input) {
            data {
              id
              name
              email
            }
            meta {
              token
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
          name,
          email,
          password,
        },
      };

      return request({
        method: 'POST',
        url: GRAPHQL_API_URL,
        body: JSON.stringify({ query, variables }),
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      }).pipe(
        map(({ response }) => {
          if (response.data.signup.error !== null) {
            throw new Error(response.data.signup.error.message);
          }
          return signUpSuccess(response.data.signup);
        }),
        catchError((err) => of(signUpFailure(err))),
      );
    }),
  );

export const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN),
    mergeMap((action) => {
      const { email, password } = action.payload;

      const query = `
        mutation ($input: LoginInput!) {
          login(input: $input) {
            data {
              id
              name
              email
            }
            meta {
              token
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
          email,
          password,
        },
      };

      return request({
        method: 'POST',
        url: GRAPHQL_API_URL,
        body: JSON.stringify({ query, variables }),
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      }).pipe(
        map(({ response }) => {
          if (response.data.login.error !== null) {
            throw new Error(response.data.login.error.message);
          }
          return loginSuccess(response.data.login);
        }),
        catchError((err) => of(loginFailure(err))),
      );
    }),
  );

export default combineEpics(signUpEpic, loginEpic);
