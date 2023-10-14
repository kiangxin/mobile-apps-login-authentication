import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import _ from 'lodash';
const ACTION_LIST = [
  'Please Smile',
  'Please Blink eyes 4 times',
  'Please Blink eyes 2 times',
  'Please Winkle',
];

const FaceGestureScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(0);
  const [hasPermission, setHasPermission] = useState();
  const [faceData, setFaceData] = useState([]);
  const [randomGesture, setRandomGesture] = useState('');

  const { id, fullName } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    setRandomGesture(getRandomGestureItem());
  }, []);
  useEffect(() => {
    if (faceData[0]) {
      const eyesShut =
        faceData[0]?.rightEyeOpenProbability < 0.3 &&
        faceData[0]?.leftEyeOpenProbability < 0.3;
      const smiling = faceData[0]?.smilingProbability > 0.8;

      if (randomGesture == 'Please Smile') {
        if (smiling) {
          navigation.navigate('HomeScreen', { id, fullName });
          
        }
      } else if (randomGesture == 'Please Blink eyes 4 times') {
        if(eyesShut){
          setCount(count + 1)
          if(count >= 4){
            return navigation.navigate('HomeScreen', { id, fullName });
          }
        }
      } else if (randomGesture == 'Please Blink eyes 2 times') {
        if(eyesShut){
            setCount(count + 1)
            
            if(count >= 2){
              return navigation.navigate('HomeScreen', { id, fullName });
            }
        }
       
      } else if (randomGesture == 'Please Winkle') {
        if (
          !eyesShut &&
          (faceData[0]?.rightEyeOpenProbability < 0.3 ||
            faceData[0]?.leftEyeOpenProbability < 0.3)
        ) {
          navigation.navigate('HomeScreen', { id, fullName });
        }
      }
    }
  }, [faceData]);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getRandomGestureItem = () =>
    ACTION_LIST[Math.floor(Math.random() * ACTION_LIST.length)];

  const HeaderView = React.memo(() => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.faceDesc}>{randomGesture || 'Smile'}</Text>
      </View>
    );
  });

  const getFaceDataView = () => {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces detected :(</Text>
          <Text style={styles.faceDesc}>Please show your face</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>Face detected :)</Text>
        </View>
      );
    }
  };

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView />
      <Camera
        type={Camera.Constants.Type.front}
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 600,
          tracking: true,
        }}
      >
        {getFaceDataView()}
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  faces: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  faceDesc: {
    fontSize: 20,
  },
  headerView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
});

export default FaceGestureScreen;
