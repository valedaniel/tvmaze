import DetailsProfile from '@/screens/Profile/Details';
import FormProfile from '@/screens/Profile/Form';
import {useAuthStore} from '@/stores/useAuthStore';
import React, {useState} from 'react';
import {Container} from './styled';

export default function Profile() {
  const {user} = useAuthStore();

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
    <Container source={require('../../assets/profile_background.jpg')}>
      {renderContent()}
    </Container>
  );
}
