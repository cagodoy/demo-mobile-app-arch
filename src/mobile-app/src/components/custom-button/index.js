import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

import TouchableView from '../touchable-view';

const CustomButton = ({ onPress, isEnabled, isLoading, text, buttonStyle, textStyle, ...otherProps }) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

  return (
    <View {...otherProps}>
      <TouchableView disabled={!isEnabled} onPress={onButtonPress} style={[styles.button, buttonStyle]}>
        {isLoading && <ActivityIndicator style={styles.spinner} color={'grey'} />}
        {!isLoading && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </TouchableView>
    </View>
  );
};

CustomButton.propTypes = {
  onPress: PropTypes.func,
  isEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  buttonStyle: PropTypes.any,
  textStyle: PropTypes.any,
};

CustomButton.defaultProps = {
  onPress: () => null,
  isEnabled: true,
  isLoading: false,
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    // alignSelf: 'stretch',
    justifyContent: 'center',
  },
  spinner: {
    height: 26,
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
});

export default CustomButton;
