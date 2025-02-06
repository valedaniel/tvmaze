import CardItem from '@/screens/Home/CardItem';
import {mockShow} from '@/screens/Home/CardItem/__tests__/mocks';
import {render, screen} from '@testing-library/react-native';
import React from 'react';

describe('CardItem', () => {
  it('renders show title correctly', () => {
    render(<CardItem show={mockShow} />);
    expect(screen.getByText('Test Show')).toBeTruthy();
  });

  it('renders language correctly', () => {
    render(<CardItem show={mockShow} />);
    expect(screen.getByText('English')).toBeTruthy();
  });

  it('renders country name when network country is available', () => {
    render(<CardItem show={mockShow} />);
    expect(screen.getByTestId('countryName')).toBeTruthy();
    expect(screen.getByText('United States')).toBeTruthy();
  });

  it('does not render country name when network country is not available', () => {
    const showWithoutCountry = {
      ...mockShow,
      network: null,
    };
    render(<CardItem show={showWithoutCountry} />);
    expect(screen.queryByTestId('countryName')).toBeNull();
  });

  it('renders image with correct props', () => {
    render(<CardItem show={mockShow} />);
    const image = screen.getByTestId('showImage');
    expect(image.props.source).toEqual({
      uri: 'https://example.com/image.jpg',
      cache: 'force-cache',
    });
  });
});
