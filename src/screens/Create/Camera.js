import React, {useRef, useEffect} from 'react';
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

export default function Camera({onReady, onRef}) {
  const cam = useRef();

  const registerCamera = (ref) => {
    cam.current = ref;
  };

  const record = (options) => {
    const config = {
      codec: RNCamera.Constants.VideoCodec.H264,
      ...options,
      maxDuration: 30,
      quality: RNCamera.Constants.VideoQuality['720p'],
    };
    return cam.current.recordAsync(config);
  };

  const stop = () => cam.current.stopRecording();

  const capture = () => cam.current.takePictureAsync();

  useEffect(() => {
    if (onRef) {
      onRef({record, stop, capture});
    }
  }, [onRef]);

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
