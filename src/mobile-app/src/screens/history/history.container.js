import { connect } from 'react-redux';
import HistoryScreen from './history.screen';
import { listHistoryByUserId } from '../../modules/history/history.state';

export default connect(
  (state) => ({
    history: state.history.get('history'),

    listHistoryByUserIdFetching: state.history.get('listHistoryByUserIdFetching'),
    listHistoryByUserIdError: state.history.get('listHistoryByUserIdError'),
    listHistoryByUserIdFetched: state.history.get('listHistoryByUserIdFetched'),
  }),
  {
    listHistoryByUserId,
  },
)(HistoryScreen);
