import Immutable from 'immutable';

/* Actions */

//
// Login
//
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//
// Sign up
//
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//
// Logout
//
export const LOGOUT = 'LOGOUT';

/* Initial state */

const initialState = Immutable.fromJS({
  //
  // Login
  //
  loginError: null,
  loginFetching: false,
  loginFetched: false,

  //
  // SignUp
  //
  signUpError: null,
  signUpFetching: false,
  signUpFetched: false,

  //
  // User
  //
  user: {
    id: null,
    name: null,
    token: null,
  },
});

//
// Login
//
export const login = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
});
export const loginSuccess = ({ data, meta }) => ({
  type: LOGIN_SUCCESS,
  payload: { data, meta },
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

//
// Sign up
//
export const signUp = ({ name, email, password }) => ({
  type: SIGN_UP,
  payload: { name, email, password },
});
export const signUpSuccess = ({ data, meta }) => ({
  type: SIGN_UP_SUCCESS,
  payload: { data, meta },
});
export const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: { error },
});

//
// Logout
//
export const logout = () => ({
  type: LOGOUT,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //
    // Login
    //
    case LOGIN: {
      return state
        .set('loginFetching', true)
        .set('loginError', null)
        .set('loginFetched', false);
    }
    case LOGIN_SUCCESS: {
      const { data, meta } = action.payload;

      return state
        .set('loginFetching', false)
        .set('loginError', null)
        .set('loginFetched', true)
        .setIn(['user', 'id'], data.id)
        .setIn(['user', 'name'], data.name)
        .setIn(['user', 'email'], data.email)
        .setIn(['user', 'token'], meta.token);
    }
    case LOGIN_FAILURE: {
      const { error } = action.payload;

      return state
        .set('loginError', error)
        .set('loginFetching', false)
        .set('loginFetched', true);
    }

    //
    // Sign up
    //
    case SIGN_UP: {
      return state
        .set('signUpError', null)
        .set('signUpFetching', true)
        .set('signUpFetched', false);
    }
    case SIGN_UP_SUCCESS: {
      const { data, meta } = action.payload;

      return state
        .set('signUpError', null)
        .set('signUpFetching', false)
        .set('signUpFetched', true)
        .setIn(['user', 'id'], data.id)
        .setIn(['user', 'name'], data.name)
        .setIn(['user', 'email'], data.email)
        .setIn(['user', 'token'], meta.token);
    }
    case SIGN_UP_FAILURE: {
      const { error } = action.payload;
      return state
        .set('signUpError', error)
        .set('signUpFetching', false)
        .set('signUpFetched', true);
    }

    //
    // Logout
    //
    case LOGOUT: {
      const {} = state;

      return state.merge(Immutable.fromJS(initialState));
    }

    default:
      return state;
  }
}
