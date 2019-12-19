import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { colors } from '../../utils/constants';

const { width } = Dimensions.get('window');

import CustomButton from '../../components/custom-button';

export default class Opening extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Iniciar Sesión'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400} />
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Crear Cuenta'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
  },
  createAccountButton: {
    backgroundColor: colors.bgA,
    borderRadius: 5,
  },
  createAccountButtonText: {
    color: 'white',
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  separatorOr: {
    color: 'white',
    marginHorizontal: 8,
  },
  signInButton: {
    backgroundColor: colors.bgB,
    borderRadius: 5,
  },
  signInButtonText: {
    color: 'white',
  },
});
