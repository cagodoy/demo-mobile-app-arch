import { connect } from 'react-redux';
import AppView from './app';

export default connect((state) => ({
  isReady: state.session.toJS().isReady,
}))(AppView);
