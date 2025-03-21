import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
  padding-left: 20px;
  height: 240px;
`;

export const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #f2f2f2;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const FlexColumn = styled.View`
  padding: 10px;
  flex: 1;
  flex-direction: column;
  gap: 5px;
`;

export const StyledImage = styled.Image`
  width: 171px;
  height: 240px;
  resize-mode: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 25px;
`;

export const SubTitle = styled.Text`
  color: #000;
  font-size: 16px;
`;
