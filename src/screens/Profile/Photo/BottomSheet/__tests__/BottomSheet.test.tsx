import {sleep} from '@/utils/sleep';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {fireEvent, render} from '@testing-library/react-native';
import React, {act} from 'react';
import {Callback, ImageLibraryOptions} from 'react-native-image-picker';
import BottomSheetPhoto from '../index';
const {launchCamera} = require('react-native-image-picker');
const {launchImageLibrary} = require('react-native-image-picker');

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('@react-native-vector-icons/ionicons', () => 'Icon');

const TIME_TO_SLEEP = 200;

describe('BottomSheetPhoto', () => {
  const onRemovePhoto = jest.fn();
  const onUpdatePhoto = jest.fn();

  it('should render correctly', async () => {
    const ref = React.createRef<BottomSheetModal>();

    const {getByText} = render(
      <BottomSheetModalProvider>
        <BottomSheetPhoto
          onRemovePhoto={onRemovePhoto}
          onUpdatePhoto={onUpdatePhoto}
          ref={ref}
          backdropComponent={null}
        />
      </BottomSheetModalProvider>,
    );

    await act(async () => {
      ref.current?.present();
      await sleep(TIME_TO_SLEEP);
    });

    const expectedTexts = ['Capturar foto', 'Selecionar imagem', 'Remover'];
    await Promise.all(
      expectedTexts.map(async text => {
        expect(getByText(text)).toBeTruthy();
      }),
    );
  });

  it('should call onUpdatePhoto when takePhoto is pressed', async () => {
    const ref = React.createRef<BottomSheetModal>();

    launchCamera.mockImplementation(
      (options: ImageLibraryOptions, callback: Callback) => {
        callback({assets: [{uri: 'test-uri'}]});
      },
    );

    const {getByText} = render(
      <BottomSheetModalProvider>
        <BottomSheetPhoto
          onRemovePhoto={onRemovePhoto}
          onUpdatePhoto={onUpdatePhoto}
          ref={ref}
          backdropComponent={null}
        />
      </BottomSheetModalProvider>,
    );

    await act(async () => {
      ref.current?.present();
      await sleep(TIME_TO_SLEEP);
    });

    fireEvent.press(getByText('Capturar foto'));
    expect(onUpdatePhoto).toHaveBeenCalledWith('test-uri');
  });

  it('should call onUpdatePhoto when openLibrary is pressed', async () => {
    const ref = React.createRef<BottomSheetModal>();

    launchImageLibrary.mockImplementation(
      (options: ImageLibraryOptions, callback: Callback) => {
        callback({assets: [{uri: 'test-uri'}]});
      },
    );

    const {getByText} = render(
      <BottomSheetModalProvider>
        <BottomSheetPhoto
          onRemovePhoto={onRemovePhoto}
          onUpdatePhoto={onUpdatePhoto}
          ref={ref}
          backdropComponent={null}
        />
      </BottomSheetModalProvider>,
    );
    await act(async () => {
      ref.current?.present();
      await sleep(TIME_TO_SLEEP);
    });

    fireEvent.press(getByText('Selecionar imagem'));
    expect(onUpdatePhoto).toHaveBeenCalledWith('test-uri');
  });

  it('should call onRemovePhoto when remove button is pressed', async () => {
    const ref = React.createRef<BottomSheetModal>();

    const {getByText} = render(
      <BottomSheetModalProvider>
        <BottomSheetPhoto
          onRemovePhoto={onRemovePhoto}
          onUpdatePhoto={onUpdatePhoto}
          ref={ref}
          backdropComponent={null}
        />
      </BottomSheetModalProvider>,
    );

    await act(async () => {
      ref.current?.present();
      await sleep(TIME_TO_SLEEP);
    });

    fireEvent.press(getByText('Remover'));
    expect(onRemovePhoto).toHaveBeenCalled();
  });
});
