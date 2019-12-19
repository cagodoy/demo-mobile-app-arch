import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-animatable';

import CustomButton from '../../components/custom-button';
import CustomTextInput from '../../components/custom-text-input';
const { width } = Dimensions.get('window');

const validate = (text) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !reg.test(text) ? false : true;
};

export default class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    fullName: '',
    ready: false,
  };

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([this.buttonRef.zoomOut(200), this.formRef.fadeOut(300), this.linkRef.fadeOut(300)]);
    }
  };

  getValidationForm() {
    const nameLenghtValidation = this.state.fullName.length !== 0;
    const emailLengthValidation = this.state.email.length !== 0;
    const emailChecker = validate(this.state.email);
    const passwordLengthValidation = this.state.password.length >= 5;
    return nameLenghtValidation && emailLengthValidation && emailChecker && passwordLengthValidation;
  }

  render() {
    const { email, password, fullName } = this.state;
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => (this.formRef = ref)}>
          <CustomTextInput
            ref={(ref) => (this.mobileInputRef = ref)}
            placeholder={'Nombre'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ fullName: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => (this.emailInputRef = ref)}
            placeholder={'Correo electrónico'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => (this.passwordInputRef = ref)}
            placeholder={'Contraseña'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => (this.buttonRef = ref)} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email, password, fullName)}
              isEnabled={this.getValidationForm()}
              isLoading={isLoading}
              buttonStyle={[
                styles.createAccountButton,
                isLoading || !this.getValidationForm()
                  ? {
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    }
                  : null,
              ]}
              textStyle={[
                styles.createAccountButtonText,
                isLoading || !this.getValidationForm() ? { color: 'rgba(0, 0, 0, 0.4)' } : null,
              ]}
              text={'Crear Cuenta'}
            />
          </View>
          <Text
            ref={(ref) => (this.linkRef = ref)}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'¿Ya tienes una cuenta?'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.1,
  },
  form: {
    marginTop: 20,
  },
  footer: {
    height: 100,
    justifyContent: 'center',
  },
  createAccountButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  createAccountButtonText: {
    color: '#3E464D',
  },
  loginLink: {
    color: 'rgba(255,255,255,0.9)',
    alignSelf: 'center',
    padding: 20,
    paddingTop: 10,
  },
});
