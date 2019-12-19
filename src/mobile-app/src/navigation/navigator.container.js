import { connect } from 'react-redux';
import NavigatorComponent from './navigator';

export default connect((state) => ({
  state: state.nav,
}))(NavigatorComponent);
