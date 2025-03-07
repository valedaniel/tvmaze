import {useAuth} from '@/contexts/AuthContext';
import {User} from '@/models/user';
import {ProvidersTest} from '@/tests/providers';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import DetailsProfile from './index';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockSetUser = jest.fn();

describe('DetailsProfile', () => {
  const user: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: 'photo-url',
    date: '2023-01-01T12:00:00Z',
  };

  const onPressEdit = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({setUser: mockSetUser});
  });

  it('renders user details correctly', () => {
    const {getByText} = render(
      <ProvidersTest>
        <DetailsProfile user={user} onPressEdit={onPressEdit} />
      </ProvidersTest>,
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john.doe@example.com')).toBeTruthy();
    expect(getByText('01/01/2023')).toBeTruthy();
  });

  it('calls onPressEdit when Edit button is pressed', () => {
    const {getByText} = render(
      <ProvidersTest>
        <DetailsProfile user={user} onPressEdit={onPressEdit} />
      </ProvidersTest>,
    );

    fireEvent.press(getByText('Edit'));
    expect(onPressEdit).toHaveBeenCalled();
  });

  it('calls setUser with null when Logout button is pressed', () => {
    const {getByText} = render(
      <ProvidersTest>
        <DetailsProfile user={user} onPressEdit={onPressEdit} />{' '}
      </ProvidersTest>,
    );

    fireEvent.press(getByText('Logout'));
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
