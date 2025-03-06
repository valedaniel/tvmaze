import BottomSheetPhoto from '@/screens/Profile/Photo/BottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Icon from '@react-native-vector-icons/ionicons';
import {useMemo, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

interface Props {
  photo?: string;
  name?: string;
  disabled?: boolean;
  onChangePhoto?: (uri: string) => void;
}

export default function Photo({onChangePhoto, photo, name, disabled}: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePhotoPress = () => {
    if (bottomSheetRef?.current) bottomSheetRef.current?.present();
  };

  const firstLetterOfEachName = useMemo(() => {
    if (name)
      return name
        ?.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return '';
  }, [name]);

  const onUpdatePhoto = (uri: string) => {
    if (onChangePhoto) onChangePhoto(uri);
    bottomSheetRef?.current?.dismiss();
  };

  const onRemovePhoto = () => {
    if (onChangePhoto) onChangePhoto('');
    bottomSheetRef?.current?.dismiss();
  };

  const renderContent = () => {
    if (photo) {
      return <Avatar.Image size={120} source={{uri: photo}} />;
    }

    if (name) return <Avatar.Text size={120} label={firstLetterOfEachName} />;

    return (
      <Avatar.Icon
        size={120}
        icon={({color, size}) => (
          <Icon name="person" color={color} size={size} />
        )}
      />
    );
  };

  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={handlePhotoPress}>
        {renderContent()}
      </TouchableOpacity>
      <BottomSheetPhoto
        ref={bottomSheetRef}
        onUpdatePhoto={onUpdatePhoto}
        onRemovePhoto={onRemovePhoto}
      />
    </>
  );
}
