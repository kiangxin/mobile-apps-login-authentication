import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  // Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Modal }from 'react-native-paper'; //ios
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';


import { FACE_SERVICE_URL } from '../common/contants';

const FaceImageUploadScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = route.params;

  const onUpload = async () => {
    try {
      if (selectedImage) {
        setIsLoading(true);
        let formData = new FormData();
        formData.append('file', selectedImage);

        const result = await fetch(`${FACE_SERVICE_URL}/api/store-face`, {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
        console.log(result?.status)
        if(result?.status == 500){
          setSelectedImage("");
          setIsLoading(false);
          setModalVisible(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please reupload an image',
          });
        }
        else{
           Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Image of your face was successfully uploaded',
          });
          setIsLoading(false);
          navigation.navigate('Login');
        }

      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please select an image of your face',
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Image uploading failed',
      });
      setIsLoading(false);
    }
  };

  const pickFromCamera = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (granted) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1, //1 means high quality
          
        });

        if (result.cancelled) {
          return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        console.log(filename);

        setSelectedImage({ uri: localUri, name: `${id}${match[0]}`, type });

        setModalVisible(false);
      } else {
        alert('You need to give permissions');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pickFromGallery = async () => {
    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1, //1 means high quality
        });
        if (result.cancelled) {
          return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        console.log(filename);
        setSelectedImage({ uri: localUri, name: `${id}${match[0]}`, type });

        setModalVisible(false);
      } else {
        alert('You need to give permissions');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='md-chevron-back-sharp' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCardContainer}>
          <View style={styles.profileCard}>
            <Image
              source={{
                uri:
                  selectedImage?.uri ||
                  'https://i.ibb.co/3fJZLpx/face-detection.png',
              }}
              resizeMode={selectedImage?.uri ? 'cover' : 'center'}
              style={styles.cardImage}
            />
          </View>
        </View>

        <View style={styles.deatilContainer}>
          <View style={styles.deatilSubContainer}>
            <Text style={styles.cardTitle}>Upload an image of your face</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingBottom: 10 }}>Upload photo</Text>
            <TouchableOpacity
              style={styles.mainBtnContainer1}
              onPress={onUpload}
            >
              {isLoading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Ionicons name='md-checkmark-sharp' size={36} color='white' />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingBottom: 10 }}>Take a photo</Text>

            <TouchableOpacity
              style={styles.mainBtnContainer2}
              onPress={() => setModalVisible(true)}
            >
              {isLoading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Ionicons name='md-camera-reverse' size={36} color='white' />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Select from where you want to take an image
            </Text>
            <View style={styles.btngrp}>
              <Pressable
                style={[styles.button, styles.camBtn]}
                onPress={pickFromCamera}
              >
                <Ionicons name='md-camera-reverse' size={18} color='white' />

                <Text style={styles.textStyle1}> Camera</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.galBtn]}
                onPress={pickFromGallery}
              >
                <Ionicons name='md-images' size={18} color='white' />
                <Text style={styles.textStyle2}>Gallery</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subContainer: {
    height: '100%',
    width: '100%',
    padding: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
  },
  headerBox: {
    display: 'flex',
    paddingRight: 25,
  },
  avatarContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtnContainer1: {
    display: 'flex',
    backgroundColor: '#2AB867',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtnContainer2: {
    display: 'flex',
    backgroundColor: '#FD8C83',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleCircle: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    backgroundColor: '#414143',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  headerText: {
    fontSize: 20,
  },
  profileCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#414143',
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 0.53,
    shadowRadius: 2,
  },
  cardImage: {
    minHeight: 400,
    width: '100%',
    borderRadius: 15,
  },
  deatilContainer: {
    paddingLeft: 40,
    display: 'flex',
    paddingTop: 10,
  },
  deatilSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 18,
  },
  cardSubHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardRateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  cardRate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDescription: {
    paddingTop: 5,
  },
  cardSubDescription: {
    fontSize: 16,
    paddingTop: 2,
    textAlign: 'justify',
  },
  cardScrollView: {
    height: 180,
    paddingRight: 32,
  },
  floatinBtn: {
    position: 'absolute',
    zIndex: 99,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 12,
    elevation: 2,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  camBtn: {
    backgroundColor: '#FF0076',
  },
  galBtn: { backgroundColor: '#00CFD0' },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 3,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btngrp: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
  },
});

export default FaceImageUploadScreen;
