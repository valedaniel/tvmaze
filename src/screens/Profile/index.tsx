import {useAuth} from '@/contexts/AuthContext';
import DetailsProfile from '@/screens/Profile/Details';
import FormProfile from '@/screens/Profile/Form';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

export default function Profile() {
  const {user} = useAuth();

  const renderContent = () => {
    if (user) return <DetailsProfile />;

    return <FormProfile />;
  };

  return (
    <ImageBackground
      source={require('../../assets/profile_background.jpg')}
      style={styles.container}>
      {renderContent()}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
