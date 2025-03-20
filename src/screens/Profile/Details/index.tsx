import {User} from '@/models/user';
import Photo from '@/screens/Profile/Photo';
import {useAuthStore} from '@/stores/useAuthStore';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

interface Props {
  user: User;
  onPressEdit: () => void;
}

export default function DetailsProfile({user, onPressEdit}: Props) {
  const {setUser} = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <Photo name={user.name} photo={user.photo} disabled />
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.subTitle}>{user.email}</Text>
          <Text style={styles.subTitle}>
            {format(parseISO(user.date), 'dd/MM/yyyy')}
          </Text>
        </View>

        <View>
          <Button mode="contained" onPress={onPressEdit} style={styles.button}>
            Edit
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => setUser(null)}
            style={styles.button}>
            Logout
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  profile: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  title: {fontSize: 30},
  subTitle: {fontSize: 15},
});
