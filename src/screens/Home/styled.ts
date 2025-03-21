import {PRIMARY_COLOR} from '@/utils/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const FlatListHeader = styled.View`
  align-items: center;
  padding-vertical: 20px;
  background-color: #f2f2f2;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 20px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 50px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${PRIMARY_COLOR};
`;
