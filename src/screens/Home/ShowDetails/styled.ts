import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f8f8f8;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: #fff;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 20px;
  padding: 10px;
  border-radius: 50px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 5;
`;

export const ShowImage = styled.Image`
  width: 100%;
  height: 400px;
  resize-mode: cover;
`;

export const DetailsContainer = styled.View`
  padding: 20px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 5;
  height: 100%;
`;

export const TopPanel = styled.View`
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

export const DetailText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: #666;
`;
