import Input from '@/components/Input';
import {useAuth} from '@/contexts/AuthContext';
import {FormProfileModel} from '@/screens/Profile/Form/types';
import {FormProfileSchema} from '@/screens/Profile/Form/yup.schema';
import Photo from '@/screens/Profile/Photo';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

export default function FormProfile() {
  const {setUser} = useAuth();

  const [photo, setPhoto] = useState<string>();

  const {control, handleSubmit, formState, watch} = useForm<FormProfileModel>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: yupResolver(FormProfileSchema),
  });

  const onSubmit = (profile: FormProfileModel) => {
    setUser({
      name: profile.name,
      email: profile.email,
      photo,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPhoto}>
        <Photo name={watch('name')} photo={photo} onChangePhoto={setPhoto} />
      </View>
      <View style={styles.form}>
        <Input
          name="name"
          control={control}
          style={styles.input}
          label="Nome completo"
          mode="outlined"
          formState={formState}
        />
        <Input
          name="email"
          control={control}
          style={styles.input}
          label="E-mail"
          mode="outlined"
          formState={formState}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '95%',
  },
  containerPhoto: {
    paddingTop: 10,
    zIndex: 1,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 80,
  },
  form: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 20,
    paddingTop: 60,
    gap: 10,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});
