import Rating from '@/screens/Home/CardItem/Rating';
import {render} from '@testing-library/react-native';
import React from 'react';

describe('RatingTest', () => {
  it('should display stars', () => {
    const {getByTestId} = render(<Rating average={10} />);

    expect(getByTestId('containerStars').children.length).toEqual(5);
  });

  it('should return null when average is undefined', () => {
    const {toJSON} = render(<Rating average={undefined} />);
    expect(toJSON()).toBeNull();
  });
});
