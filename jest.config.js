module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-reanimated)/)',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePathIgnorePatterns: ['mocks'],
};
