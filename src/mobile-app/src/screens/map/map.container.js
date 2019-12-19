import { connect } from 'react-redux';
import MapScreen from './map.screen';
import { listRestaurantsByCoord } from '../../modules/restaurants/restaurants.state';

export default connect(
  (state) => ({
    restaurants: state.restaurants.get('restaurants'),

    listRestaurantsByCoordFetching: state.restaurants.get('listRestaurantsByCoordFetching'),
    listRestaurantsByCoordError: state.restaurants.get('listRestaurantsByCoordError'),
    listRestaurantsByCoordFetched: state.restaurants.get('listRestaurantsByCoordFetched'),
  }),
  {
    listRestaurantsByCoord,
  },
)(MapScreen);
