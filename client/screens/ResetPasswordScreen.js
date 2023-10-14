
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Formik } from 'formik';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { resetPasswordSchema} from '../common/validation.schema';
import { BASE_URL } from '../common/contants';


const ResetPasswordScreen = ({route,navigation}) => {
  const formikRef = useRef();
  const { email } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  
  
  const handleResetPassword = async (values) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/api/auth/resetPassword`, values);
      setIsLoading(false);
      showSuccessToast();
      formikRef.current?.resetForm();
      navigation.navigate('LoginScreen');
      
    } catch (err) {
      showErrorToast();
      setIsLoading(false);

    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Reset password successfully',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Reset password fail',
    });
  };

  const initialFormValues = {
    email:email,
    password: '',
    confirmPassword: ''  
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LottieView
        source={require('../assets/logo.json')}
        autoPlay
        loop
        style={styles.logo}
      />

      <Text style={styles.text}>AUTH4</Text>
      <Formik
        initialValues={initialFormValues}
        validationSchema={resetPasswordSchema}
        onSubmit={(values) => {
            handleResetPassword(values);
        }}
        innerRef={formikRef}
      >
        {({ errors, handleChange, touched, values, handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <View>
              <TextInput
                  placeholder='Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  secureTextEntry
                  name='password'
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  placeholder='Confirm Password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  style={[
                    styles.input,
                    touched.confirmPassword &&
                      errors.confirmPassword &&
                      styles.inputError,
                  ]}
                  secureTextEntry
                  name='confirmPassword'
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={handleSubmit}
              >
                {isLoading ? (
                  <ActivityIndicator size='small' color='#0782F9' />
                ) : (
                  <Text style={styles.buttonOutlineText}>Reset Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};



export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputError: { borderWidth: 1, borderColor: 'red' },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  logo: {
    paddingTop: 5,
    height: 200,
    width: 200,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    color: '#051d5f',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 30,
    justifyContent: 'center',
    paddingTop: 20,
  },
  color_textPrivate: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  errorText: {
    padding: 4,
    color: 'red',
    fontSize: 12,
  },
});
