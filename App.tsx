import React, {useEffect} from 'react';

import Routes from '@/routes';
import {useAuthStore} from '@/stores/useAuthStore';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '@/utils/constants';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import NetInfo from '@react-native-community/netinfo';
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
  },
};

const queryClient = new QueryClient();

export default function App() {
  const {loadCurrentUser} = useAuthStore();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <Routes />
          </PaperProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
