import {PRIMARY_COLOR} from '@/utils/constants';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import Icon from '@react-native-vector-icons/ionicons';
import React, {forwardRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';

interface BottomSheetPhotoProps
  extends Omit<BottomSheetModalProps, 'children'> {
  onRemovePhoto: () => void;
  onUpdatePhoto: (uri: string) => void;
}

export const BottomSheetPhoto = forwardRef<
  BottomSheetModal,
  BottomSheetPhotoProps
>(({onRemovePhoto, onUpdatePhoto, ...rest}, ref) => {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const takePhoto = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        onUpdatePhoto(response.assets[0].uri);
      }
    });
  };

  const openLibrary = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        onUpdatePhoto(response.assets[0].uri);
      }
    });
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      animationConfigs={animationConfigs}
      backdropComponent={renderBackdrop}
      containerStyle={styles.container}
      backgroundStyle={styles.backgroundBottomStyle}
      ref={ref}
      {...rest}>
      <BottomSheetView style={styles.bottomSheetView}>
        <Button
          textColor={PRIMARY_COLOR}
          buttonColor="#FFFFFF"
          icon={({color, size}) => (
            <Icon name="camera" color={color} size={size} />
          )}
          onPress={takePhoto}
          mode="contained"
          style={styles.button}>
          Capture photo
        </Button>
        <Button
          textColor={PRIMARY_COLOR}
          buttonColor="#FFFFFF"
          icon={({color, size}) => (
            <Icon name="images" color={color} size={size} />
          )}
          onPress={openLibrary}
          mode="contained"
          style={styles.button}>
          Select image
        </Button>
        <Button
          textColor="red"
          buttonColor="#FFFFFF"
          icon={({color, size}) => (
            <Icon name="trash" color={color} size={size} />
          )}
          onPress={onRemovePhoto}
          mode="contained"
          style={styles.button}>
          Remove
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  bottomSheetView: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    gap: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
  },
  backgroundBottomStyle: {
    backgroundColor: '#f2f2f2',
  },
});
