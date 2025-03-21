import {Button} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

export const ContainerPhoto = styled.View`
  z-index: 1;
  top: 40px;
  align-items: center;
  width: 100%;
`;

export const Form = styled.View`
  background-color: #ffffff;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  padding: 20px;
  padding-top: 60px;
  flex: 1;
  justify-content: space-between;
`;

export const ContainerInputs = styled.View`
  flex: 1;
  height: 100%;
  gap: 10px;
`;

export const SaveButton = styled(Button)`
  margin-top: 20px;
`;
