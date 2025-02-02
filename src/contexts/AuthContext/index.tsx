import {User} from '@/models/user';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';

interface AuthContextData {
  user?: User | null;
  setUser: (user?: User | null) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: Props) => {
  const [user, _setUser] = useState<User | null>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const logout = async () => {
    await storeCurrentUser(null);
  };

  const storeCurrentUser = async (user?: User | null) => {
    try {
      let success = true;

      if (user) {
        const jsonValue = JSON.stringify(user);
        const result = await Keychain.setGenericPassword(
          user.username,
          jsonValue,
          {server: ''},
        );

        if (typeof result === 'boolean') {
          success = result;
        }
      } else {
        const result = await Keychain.resetGenericPassword();

        if (typeof result === 'boolean') {
          success = result;
        }
      }

      if (success) _setUser(user);
    } catch (error) {
      _setUser(null);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await Keychain.getGenericPassword();

      if (currentUser) {
        _setUser(
          currentUser?.password ? JSON.parse(currentUser.password) : null,
        );
      } else {
        _setUser(null);
      }
    } catch (error) {
      _setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: storeCurrentUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
