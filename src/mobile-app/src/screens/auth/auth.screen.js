import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { View } from 'react-native-animatable';

import Opening from './opening.component';
import SignupForm from './signup-form.component';
import LoginForm from './login-form.component';
import { colors } from '../../utils/constants';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visibleForm: null,
  };

  componentDidUpdate(prevProps) {
    // check login flow
    if (!prevProps.loginFetched && this.props.loginFetched) {
      if (!this.props.loginError) {
        this.props.navigation.navigate('App');
      } else {
        Alert.alert('Error', this.props.loginError.message);
      }

      return;
    }

    // check signup flow
    if (!prevProps.signUpFetched && this.props.signUpFetched) {
      if (!this.props.signUpError) {
        this.props.navigation.navigate('App');
      } else {
        Alert.alert('Error', this.props.signUpError.message);
      }

      return;
    }
  }

  componentWillUnmount() {
    this.container.bounceOut(800);
  }

  _setVisibleForm = async (visibleForm) => {
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm();
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ visibleForm });
  };

  signup = (email, password, name) => {
    this.props.signUp({ name, email, password });
  };

  login = (email, password) => {
    this.props.login(email, password);
  };

  showInformation = () => {
    Alert.alert(
      'Information',
      'Tenpo challenge. Made by @cagodoy. You can find more information in Github repository.',
      [
        {
          text: 'Github',
          onPress: () => Linking.openURL('https://github.com/cagodoy/tenpo-challenge'),
        },
      ],
    );
  };

  render() {
    const { loginFetching, signUpFetching } = this.props;
    const { visibleForm } = this.state;

    let isLoading = false;
    if (loginFetching || signUpFetching) {
      isLoading = true;
    }

    const formStyle = !visibleForm ? { height: 0 } : { marginTop: 40 };

    return (
      <View style={styles.container}>
        <View style={styles.container} ref={(ref) => (this.container = ref)}>
          <View animation={'bounceIn'} duration={1200} delay={200} style={styles.subcontainer}>
            <TouchableOpacity style={styles.logoContainer} onPress={this.showInformation}>
              <Image style={{ width: 150, height: 150 }} source={require('../../../assets/tenpo_logo.png')} />
            </TouchableOpacity>
          </View>
          {!visibleForm && (
            <Opening
              onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
              onSignInPress={() => this._setVisibleForm('LOGIN')}
            />
          )}
          <KeyboardAvoidingView keyboardVerticalOffset={-35} behavior={'padding'} style={[formStyle, styles.bottom]}>
            {visibleForm === 'SIGNUP' && (
              <SignupForm
                ref={(ref) => (this.formRef = ref)}
                onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
                onSignupPress={this.signup}
                isLoading={isLoading}
              />
            )}
            {visibleForm === 'LOGIN' && (
              <LoginForm
                ref={(ref) => (this.formRef = ref)}
                onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
                onLoginPress={this.login}
                isLoading={isLoading}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

AuthScreen.propTypes = {
  loginError: PropTypes.any,
  loginFetching: PropTypes.bool.isRequired,
  loginFetched: PropTypes.bool.isRequired,

  signUpError: PropTypes.any,
  signUpFetching: PropTypes.bool.isRequired,
  signUpFetched: PropTypes.bool.isRequired,

  signUp: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingTop: 24,
    backgroundColor: '#ffffff',
  },
  logoImg: {
    flex: 1,
    height: null,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30,
  },
  bottom: {
    backgroundColor: colors.primary,
  },
  subcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 150,
  },
});
