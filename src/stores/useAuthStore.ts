import {User} from '@/models/user';
import * as Keychain from 'react-native-keychain';
import {create} from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  logout: () => Promise<void>;
  loadCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  setUser: async (user: User | null) => {
    try {
      if (user) {
        const jsonValue = JSON.stringify(user);
        await Keychain.setGenericPassword(user.email, jsonValue, {server: ''});
      } else {
        await Keychain.resetGenericPassword();
      }

      set({user});
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },
  logout: async () => {
    try {
      const result = await Keychain.resetGenericPassword();
      if (typeof result === 'boolean' && result) {
        set({user: null});
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  loadCurrentUser: async () => {
    try {
      const currentUser = await Keychain.getGenericPassword();
      if (currentUser) {
        set({
          user: currentUser?.password ? JSON.parse(currentUser.password) : null,
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  },
}));
