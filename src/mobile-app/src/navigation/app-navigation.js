import { createStackNavigator } from 'react-navigation-stack';
import Map from '../screens/map/map.container';
import History from '../screens/history/history.container';

const AppNavigation = createStackNavigator(
  {
    Map: { screen: Map },
    History: { screen: History },
  },
  {
    initialRouteName: 'Map',
  },
);

export default AppNavigation;
