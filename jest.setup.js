import 'react-native-gesture-handler/jestSetup';
jest.mock('@react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

require('react-native-reanimated').setUpTests();
