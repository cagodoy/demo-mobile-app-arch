import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './auth-navigation';
import AppNavigation from './app-navigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
