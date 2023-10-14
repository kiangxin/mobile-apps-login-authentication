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

import { updatePasswordSchema } from '../common/validation.schema';
import { BASE_URL } from '../common/contants';

const UpdatePasswordScreen = ({route,navigation}) => {
    const formikRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (values) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${BASE_URL}/api/auth/forgotPassword`, values);
      setIsLoading(false);
      showSuccessToast();
      formikRef.current?.resetForm();
      navigation.navigate('ResetPasswordScreen', {
        id: result?.data?.data?.user?.id,
        email: result?.data?.data?.user?.email,
      });

    } catch (err) {
      showErrorToast();
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Request Successfully',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No such email registered',
    });
  };

  const initialFormValues = {
    email: '',
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
        validationSchema={updatePasswordSchema}
        onSubmit={(values) => {
          handleForgotPassword(values);
        }}
        innerRef={formikRef}
      >
        {({ errors, handleChange, touched, values, handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <View>
              <TextInput
                  placeholder='Email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  keyboardType='email-address'
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
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


export default UpdatePasswordScreen;

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
