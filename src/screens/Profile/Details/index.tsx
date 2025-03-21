import {User} from '@/models/user';
import Photo from '@/screens/Profile/Photo';
import {useAuthStore} from '@/stores/useAuthStore';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {View} from 'react-native';
import {
  Container,
  Profile,
  StyledButton,
  SubTitle,
  Title,
  Wrapper,
} from './styled';

interface Props {
  user: User;
  onPressEdit: () => void;
}

export default function DetailsProfile({user, onPressEdit}: Props) {
  const {setUser} = useAuthStore();

  return (
    <Container>
      <Wrapper>
        <Profile>
          <Photo name={user.name} photo={user.photo} disabled />
          <Title>{user.name}</Title>
          <SubTitle>{user.email}</SubTitle>
          <SubTitle>{format(parseISO(user.date), 'dd/MM/yyyy')}</SubTitle>
        </Profile>

        <View>
          <StyledButton mode="contained" onPress={onPressEdit}>
            Edit
          </StyledButton>
          <StyledButton mode="contained-tonal" onPress={() => setUser(null)}>
            Logout
          </StyledButton>
        </View>
      </Wrapper>
    </Container>
  );
}
