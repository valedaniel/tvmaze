import Input from '@/components/Input';
import {FormProfileModel} from '@/screens/Profile/Form/types';
import {FormProfileSchema} from '@/screens/Profile/Form/yup.schema';
import Photo from '@/screens/Profile/Photo';
import {useAuthStore} from '@/stores/useAuthStore';
import {yupResolver} from '@hookform/resolvers/yup';
import Icon from '@react-native-vector-icons/ionicons';
import {format, parseISO} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import {
  Container,
  ContainerInputs,
  ContainerPhoto,
  Form,
  SaveButton,
} from './styled';

interface Props {
  isEditing: boolean;
  onFinishEdit: () => void;
}

export default function FormProfile({isEditing, onFinishEdit}: Props) {
  const {user, setUser} = useAuthStore();

  const [photo, setPhoto] = useState<string>();
  const [dateOpen, setDateOpen] = useState<boolean>(false);

  const {control, handleSubmit, formState, watch, setValue} =
    useForm<FormProfileModel>({
      defaultValues: {
        name: '',
        email: '',
        date: '',
      },
      resolver: yupResolver(FormProfileSchema),
    });

  useEffect(() => {
    if (isEditing && user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('date', user.date);

      setPhoto(user?.photo);
    }
  }, [isEditing]);

  const onSubmit = (profile: FormProfileModel) => {
    setUser({
      name: profile.name,
      email: profile.email,
      photo,
      date: profile.date,
    });

    if (isEditing) onFinishEdit();
  };

  return (
    <Container>
      <DatePicker
        modal
        open={dateOpen}
        date={watch('date') ? new Date(watch('date')) : new Date()}
        mode="date"
        onConfirm={date => {
          setDateOpen(false);
          setValue('date', date.toISOString(), {shouldValidate: true});
        }}
        onCancel={() => {
          setDateOpen(false);
        }}
        maximumDate={new Date()}
      />
      <ContainerPhoto>
        <Photo name={watch('name')} photo={photo} onChangePhoto={setPhoto} />
      </ContainerPhoto>
      <Form>
        <ContainerInputs>
          <Input
            name="name"
            control={control}
            style={styles.input}
            label="Full name"
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
          <TouchableOpacity onPress={() => setDateOpen(true)}>
            <Input
              name="date"
              control={control}
              style={styles.input}
              label="Birthday"
              mode="outlined"
              formState={formState}
              formatValue={value => {
                if (value) return format(parseISO(value), 'dd/MM/yyyy');
                return '';
              }}
              readOnly
              right={
                <TextInput.Icon
                  icon={({color, size}) => (
                    <Icon
                      name="calendar-number-sharp"
                      color={color}
                      size={size}
                    />
                  )}
                />
              }
            />
          </TouchableOpacity>
        </ContainerInputs>
        <SaveButton mode="contained" onPress={handleSubmit(onSubmit)}>
          Save
        </SaveButton>
      </Form>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
  },
});
