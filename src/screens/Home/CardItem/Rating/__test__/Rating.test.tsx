import Rating from '@/screens/Home/CardItem/Rating';
import {render} from '@testing-library/react-native';
import React from 'react';

jest.mock('@react-native-vector-icons/ionicons', () => 'Icon');

describe('RatingTest', () => {
  it('should display stars', () => {
    const {getByTestId} = render(<Rating average={10} />);

    expect(getByTestId('containerStars').children.length).toEqual(5);
  });
});
