import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './OnboardingScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import InputMobile from './InputMobileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPScreen from './OTPScreen';
import FaceImageUploadScreen from './FaceImageUploadScreen';
import FaceImageRecognitionScreen from './FaceImageRecognitionScreen';
import FaceGestureScreen from './FaceGestureScreen';
import HomeScreen from './HomeScreen';
import UpdatePasswordScreen from './UpdatePasswordScreen';
import ResetPasswordScreen from './ResetPasswordScreen';


const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routeName}
    >
      <RootStack.Screen name='Onboarding' component={OnboardingScreen} />
      <RootStack.Screen name='Login' component={LoginScreen} />
      <RootStack.Screen name='Register' component={SignupScreen} />
      <RootStack.Screen name='InputMobile' component={InputMobile} />
      <RootStack.Screen name='OTPScreen' component={OTPScreen} />
      <RootStack.Screen name='LoginScreen' component={LoginScreen} />
      <RootStack.Screen name='FaceImageUploadScreen'component={FaceImageUploadScreen}/>
      <RootStack.Screen name='FaceImageRecognitionScreen' component={FaceImageRecognitionScreen}/>
      <RootStack.Screen name='FaceGestureScreen' component={FaceGestureScreen}/>
      <RootStack.Screen name='HomeScreen' component={HomeScreen} />
      <RootStack.Screen name='UpdatePasswordScreen' component={UpdatePasswordScreen} />
      <RootStack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
