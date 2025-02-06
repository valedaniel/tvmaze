import Home from '@/screens/Home';
import ShowDetails from '@/screens/Home/ShowDetails';
import Profile from '@/screens/Profile';
import Icon from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
      },
    },
    ShowDetails: {
      screen: ShowDetails,

      options: {},
    },
  },
});

const MyTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#14968B',
    tabBarInactiveTintColor: '#8c8c8c',
  },
  screens: {
    HomeBottom: {
      screen: HomeStack,
      options: {
        title: 'Home',
        tabBarIcon: ({color}) => {
          return <Icon name="home" size={20} color={color} />;
        },
      },
    },
    ProfileBottom: {
      screen: Profile,
      options: {
        title: 'Profile',
        tabBarIcon: ({color}) => {
          return <Icon name="person" size={20} color={color} />;
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function Routes() {
  return <Navigation />;
}
