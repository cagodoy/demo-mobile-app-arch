import Immutable from 'immutable';

/* Actions */

//
// listHistoryByUserId
//
export const LIST_HISTORY_BY_USER_ID = 'LIST_HISTORY_BY_USER_ID';
export const LIST_HISTORY_BY_USER_ID_SUCCESS = 'LIST_HISTORY_BY_USER_ID_SUCCESS';
export const LIST_HISTORY_BY_USER_ID_FAILURE = 'LIST_HISTORY_BY_USER_ID_FAILURE';

/* Initial state */

const initialState = Immutable.fromJS({
  //
  // listHistoryByUserId
  //
  listHistoryByUserIdError: null,
  listHistoryByUserIdFetching: false,
  listHistoryByUserIdFetched: false,
  history: [],
});

//
// listHistoryByUserId
//
export const listHistoryByUserId = () => ({
  type: LIST_HISTORY_BY_USER_ID,
  payload: {},
});
export const listHistoryByUserIdSuccess = ({ data, meta }) => ({
  type: LIST_HISTORY_BY_USER_ID_SUCCESS,
  payload: { data, meta },
});
export const listHistoryByUserIdFailure = (error) => ({
  type: LIST_HISTORY_BY_USER_ID_FAILURE,
  payload: { error },
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //
    // listHistoryByUserId
    //
    case LIST_HISTORY_BY_USER_ID: {
      return state
        .set('listHistoryByUserIdFetching', true)
        .set('listHistoryByUserIdError', null)
        .set('listHistoryByUserIdFetched', false);
    }
    case LIST_HISTORY_BY_USER_ID_SUCCESS: {
      const { data, meta } = action.payload;

      const d = data.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      return state
        .set('listHistoryByUserIdFetching', false)
        .set('listHistoryByUserIdError', null)
        .set('listHistoryByUserIdFetched', true)
        .set('history', d);
    }
    case LIST_HISTORY_BY_USER_ID_FAILURE: {
      const { error } = action.payload;

      return state
        .set('listHistoryByUserIdError', error)
        .set('listHistoryByUserIdFetching', false)
        .set('listHistoryByUserIdFetched', true);
    }

    default:
      return state;
  }
}
