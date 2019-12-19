import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

import { initializeSessionState } from './modules/session/session.state';

import NavigatorContainer from './navigation/navigator.container';
import DeveloperMenu from './components/developer-menu/developer-menu';

import { colors } from './utils/constants';

class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    //reset snapshot
    this.props.dispatch(initializeSessionState());
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator style={styles.centered} color={colors.primary} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="green" barStyle="light-content" />
        <NavigatorContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
  activityIndicatorContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default AppView;
