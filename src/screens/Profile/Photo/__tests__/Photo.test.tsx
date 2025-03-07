import {BottomSheetPhoto} from '@/screens/Profile/Photo/BottomSheet';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import Photo from '../';

jest.mock('@/screens/Profile/Photo/BottomSheet', () => ({
  BottomSheetPhoto: jest.fn(({onUpdatePhoto, onRemovePhoto}) => null),
}));

describe('Photo Component', () => {
  it('renders correctly with photo', () => {
    const {getByTestId} = render(<Photo photo="test-uri" />);
    expect(getByTestId('avatar-image')).toBeTruthy();
  });

  it('renders correctly with name', () => {
    const {getByTestId} = render(<Photo name="John Doe" />);
    expect(getByTestId('avatar-text')).toBeTruthy();
  });

  it('renders correctly without photo and name', () => {
    const {getByTestId} = render(<Photo />);
    expect(getByTestId('avatar-icon')).toBeTruthy();
  });

  it('calls handlePhotoPress when TouchableOpacity is pressed', () => {
    const {getByTestId} = render(<Photo />);
    const touchableOpacity = getByTestId('button-photo');
    fireEvent.press(touchableOpacity);
    expect(BottomSheetPhoto.prototype.present).toHaveBeenCalled();
  });

  it('calls onUpdatePhoto when photo is updated', () => {
    const onChangePhoto = jest.fn();
    const {getByTestId} = render(<Photo onChangePhoto={onChangePhoto} />);
    const bottomSheetPhoto = getByTestId('bottom-sheet-photo');
    fireEvent(bottomSheetPhoto, 'onUpdatePhoto', 'new-uri');
    expect(onChangePhoto).toHaveBeenCalledWith('new-uri');
    expect(BottomSheetModal.prototype.dismiss).toHaveBeenCalled();
  });

  it('calls onRemovePhoto when photo is removed', () => {
    const onChangePhoto = jest.fn();
    const {getByTestId} = render(<Photo onChangePhoto={onChangePhoto} />);
    const bottomSheetPhoto = getByTestId('bottom-sheet-photo');
    fireEvent(bottomSheetPhoto, 'onRemovePhoto');
    expect(onChangePhoto).toHaveBeenCalledWith('');
    expect(BottomSheetModal.prototype.dismiss).toHaveBeenCalled();
  });
});
