import { connect } from 'react-redux';
import AuthScreen from './auth.screen';
import { signUp, login } from '../../modules/auth/auth.state';

export default connect(
  (state) => ({
    loginError: state.auth.get('loginError'),
    loginFetching: state.auth.get('loginFetching'),
    loginFetched: state.auth.get('loginFetched'),

    signUpError: state.auth.get('signUpError'),
    signUpFetching: state.auth.get('signUpFetching'),
    signUpFetched: state.auth.get('signUpFetched'),

    user: state.auth.get('user').toJS(),
  }),
  {
    signUp,
    login,
  },
)(AuthScreen);
