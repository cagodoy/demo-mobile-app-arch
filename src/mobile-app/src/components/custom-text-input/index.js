import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-animatable';

const IS_ANDROID = Platform.OS === 'android';

export default class CustomTextInput extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool,
  };

  state = {
    isFocused: false,
  };

  focus = () => this.textInputRef.focus();

  render() {
    const { isEnabled, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const color = isEnabled ? 'white' : 'rgba(255,255,255,0.6)';
    const borderColor = isFocused ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)';
    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            ref={(ref) => (this.textInputRef = ref)}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={[styles.textInput, { color }]}
            maxLength={32}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            selectionColor={'white'}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10,
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    color: 'white',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  },
});
