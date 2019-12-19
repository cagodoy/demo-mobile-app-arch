import React from 'react';
import { Provider } from 'react-redux';
import { ScreenOrientation } from 'expo';
import * as Font from 'expo-font';

import store from './src/redux/store';
import AppContainer from './src/app.container';

ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
Font.loadAsync({
  lato: require('./assets/fonts/Lato-Regular.ttf'),
  'lato-light': require('./assets/fonts/Lato-Light.ttf'),
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
