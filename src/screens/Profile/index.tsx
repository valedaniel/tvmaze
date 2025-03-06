import {useAuth} from '@/contexts/AuthContext';
import DetailsProfile from '@/screens/Profile/Details';
import FormProfile from '@/screens/Profile/Form';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

export default function Profile() {
  const {user} = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    if (user && !isEditing)
      return <DetailsProfile user={user} onPressEdit={toggleIsEditing} />;

    return <FormProfile isEditing={isEditing} onFinishEdit={toggleIsEditing} />;
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
