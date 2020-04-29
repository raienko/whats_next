import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from 'src/utils/metrics';
import {RNCamera} from 'react-native-camera';

const androidCameraRequest = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

const androidAudioRequest = {
  title: 'Permission to use audio recording',
  message: 'We need your permission to use your audio',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

export default function Camera({ onReady }) {
  const cam = useRef();

  const registerCamera = (ref) => {
    cam.current = ref;
  };

  return (
    <View style={styles.wrapper}>
      <RNCamera
        ref={registerCamera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={androidCameraRequest}
        androidRecordAudioPermissionOptions={androidAudioRequest}
        onCameraReady={onReady}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: screenWidth,
    height: screenHeight,
  },
  preview: {
    width: screenWidth,
    height: screenHeight,
  },
});
