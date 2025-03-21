import {Button, Text} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const Profile = styled.View`
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const SubTitle = styled(Text)`
  font-size: 15px;
`;
