import 'react-native-gesture-handler/jestSetup';
jest.mock('@react-native-vector-icons/Ionicons', () => 'Icon');
require('react-native-reanimated').setUpTests();
