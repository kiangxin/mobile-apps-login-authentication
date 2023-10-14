import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { OTP } from 'react-native-otp-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { BASE_URL } from '../common/contants';

const OTPScreen = ({ route, navigation }) => {
  let clockCall = null;

  const defaultCountdown = 60;
  const [countdown, setCountDown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { otpId, id, fullName, mobileNumber } = route.params;

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countdown - 1);
    }
  };

  const onResendOTP = async () => {
    if (enableResend) {
      setCountDown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
    
    try {
      if (mobileNumber) {
        setIsLoading(true);
        const result = await axios.post(`${BASE_URL}/api/auth/resend-otp`, {
          otpId,
        });
        if (!result?.data) return showErrorToast();

        setIsLoading(false);
        showSuccessToast2();

      } else {
        showErrorToast2();
        setIsLoading(false);
      }
    } catch (err) {
      console.log('error')
      setIsLoading(false);
    }
  };

  const onOTPCodeSubmit = async (code) => {
    try {
      if (code !== '') {
        setIsLoading(true);
        const result = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
          otpId,
          otpCode: code,
        });
        if (result?.data?.data?.success == true) {
          showSuccessToast();
          navigation.navigate('FaceImageRecognitionScreen', {
            id: id,
            fullName,
          });
        }
        setIsLoading(false);
      }
    } catch (err) {
      showErrorToast();
      setIsLoading(false);
    
    }
  };


  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'OTP verified successfully',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Invalid OTP Code or Code Expired',
    });
  };

  const showSuccessToast2 = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'OTP resend successfully',
    });
  };

  const showErrorToast2 = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'OTP resend failed',
    });
  };



  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.textTitle}>Please enter the OTP code sent via SMS</Text>
        <View>
          {isLoading ? (
            <ActivityIndicator size='large' color='#0782F9' />
          ) : (

            <OTPInputView style={{width: '80%', height: 200}}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.borderStyleBase}
            codeInputHighlightStyle={styles.borderStyleHighLighted}
            keyboardType={'default'}
            onCodeFilled= {onOTPCodeSubmit}/>
          )}
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}

        >
          <View style={styles.btnBack}>
            <Text style={[styles.txtBack, { color: '#244BD7' }]}>Back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        disabled = {!enableResend}
        onPress={onResendOTP}>
          <View style={styles.btnResend}>
            <Text
              style={[
                styles.txtResend,
                {
                  color: enableResend ? '#244DB7' : 'gray',
                },
              ]}
            >
              Resend OTP ({countdown})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoiddingView: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    padding: 10,
    display: 'flex',
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  txtResend: {
    alignItems: 'center',
    fontSize: 16,
  },
  btnBack: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtBack: {
    alignItems: 'center',
    fontSize: 16,
  },
  otpInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  focusInput: {
    borderWidth: 1,
    borderColor: '#244BD7',
  },
  borderStyleBase: {
    width: 40,
    height: 45,
    color:'black',
    borderRadius:10,
    borderColor: '#9a9da6',
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});