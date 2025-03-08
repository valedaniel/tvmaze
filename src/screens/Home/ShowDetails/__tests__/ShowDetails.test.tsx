import {openURL} from '@/utils/openURL';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import ShowDetails from '../index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/services/show.service');
jest.mock('@/utils/openURL');

describe('ShowDetails', () => {
  const mockNavigation = {goBack: jest.fn()};
  const mockRoute = {
    params: {
      show: {
        id: 1,
        name: 'Test Show',
        image: {original: 'https://example.com/image.jpg'},
        rating: {average: 8.5},
        genres: ['Drama', 'Thriller'],
        language: 'English',
        network: {name: 'Test Network'},
        officialSite: 'https://www.testshow.com',
        premiered: '2025-01-01T12:00:00',
        status: 'Running',
        updated: 1735743600000,
      },
    },
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    (useQuery as jest.Mock).mockReturnValue({
      data: [{id: 1, name: 'Episode 1'}],
    });
  });

  it('renders show details correctly', () => {
    const {getByText, getByTestId} = render(<ShowDetails />);

    expect(getByTestId('showImage').props.source.uri).toBe(
      'https://example.com/image.jpg',
    );
    expect(getByText('Test Show')).toBeTruthy();
    expect(getByText('Episodes: 1')).toBeTruthy();
    expect(getByText('Genres: Drama, Thriller')).toBeTruthy();
    expect(getByText('Language: English')).toBeTruthy();
    expect(getByText('Network: Test Network')).toBeTruthy();
    expect(getByText('Official Site: testshow.com')).toBeTruthy();
    expect(getByText('Premiered: 01/01/2025')).toBeTruthy();
    expect(getByText('Status: Running')).toBeTruthy();
    expect(getByText('Updated: 01/01/2025')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const {getByTestId} = render(<ShowDetails />);
    fireEvent.press(getByTestId('back-button'));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('opens official site when link is pressed', () => {
    const {getByText} = render(<ShowDetails />);
    fireEvent.press(getByText('Official Site: testshow.com'));

    expect(openURL).toHaveBeenCalledWith('https://www.testshow.com');
  });
});
