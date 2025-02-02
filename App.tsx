import React from 'react';

import {AuthProvider} from '@/src/contexts/AuthContext';
import Home from '@/src/screens/Home';
import Profile from '@/src/screens/Profile';
import Icon from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';

const MyTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        tabBarIcon: ({color}) => {
          return <Icon name="home" size={20} color={color} />;
        },
      },
    },
    Profile: {
      screen: Profile,
      options: {
        tabBarIcon: ({color}) => {
          return <Icon name="person" size={20} color={color} />;
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
