import Immutable from 'immutable';

/* Actions */

//
// listRestaurantsByCoord
//
export const LIST_RESTAURANTS_BY_COORD = 'LIST_RESTAURANTS_BY_COORD';
export const LIST_RESTAURANTS_BY_COORD_SUCCESS = 'LIST_RESTAURANTS_BY_COORD_SUCCESS';
export const LIST_RESTAURANTS_BY_COORD_FAILURE = 'LIST_RESTAURANTS_BY_COORD_FAILURE';

/* Initial state */

const initialState = Immutable.fromJS({
  //
  // listRestaurantsByCoord
  //
  listRestaurantsByCoordError: null,
  listRestaurantsByCoordFetching: false,
  listRestaurantsByCoordFetched: false,
  restaurants: [],
});

//
// listRestaurantsByCoord
//
export const listRestaurantsByCoord = (latitude, longitude) => ({
  type: LIST_RESTAURANTS_BY_COORD,
  payload: { latitude, longitude },
});
export const listRestaurantsByCoordSuccess = ({ data, meta }) => ({
  type: LIST_RESTAURANTS_BY_COORD_SUCCESS,
  payload: { data, meta },
});
export const listRestaurantsByCoordFailure = (error) => ({
  type: LIST_RESTAURANTS_BY_COORD_FAILURE,
  payload: { error },
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //
    // listRestaurantsByCoord
    //
    case LIST_RESTAURANTS_BY_COORD: {
      return state
        .set('listRestaurantsByCoordFetching', true)
        .set('listRestaurantsByCoordError', null)
        .set('listRestaurantsByCoordFetched', false);
    }
    case LIST_RESTAURANTS_BY_COORD_SUCCESS: {
      const { data, meta } = action.payload;
      console.log('success', data);
      return state
        .set('listRestaurantsByCoordFetching', false)
        .set('listRestaurantsByCoordError', null)
        .set('listRestaurantsByCoordFetched', true)
        .set('restaurants', data);
    }
    case LIST_RESTAURANTS_BY_COORD_FAILURE: {
      const { error } = action.payload;
      console.log('fail', error);
      return state
        .set('listRestaurantsByCoordError', error)
        .set('listRestaurantsByCoordFetching', false)
        .set('listRestaurantsByCoordFetched', true);
    }

    default:
      return state;
  }
}
