import { createStackNavigator } from 'react-navigation-stack';
import Auth from '../screens/auth/auth.container';

const AuthNavigation = createStackNavigator(
  {
    Auth: { screen: Auth },
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
  },
);

export default AuthNavigation;
