import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  FormState,
  RegisterOptions,
} from 'react-hook-form';
import {View} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {ErrorText} from './styled';

interface InputProps<
  T extends FieldValues,
  TFieldName extends FieldPath<T>,
  TName extends FieldPath<T>,
> extends TextInputProps {
  name: TName;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, TFieldName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  formState: FormState<T>;
  formatValue?: (value: string) => string;
}

export default function Input<
  T extends FieldValues,
  TFieldName extends FieldPath<T>,
>({
  control,
  formState,
  rules,
  name,
  formatValue,
  ...rest
}: InputProps<T, TFieldName, TFieldName>) {
  const {errors} = formState;

  const errorFound = errors?.[name];

  return (
    <View>
      <Controller
        control={control as Control<FieldValues>}
        rules={
          rules as Omit<
            RegisterOptions<FieldValues, string>,
            'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
          >
        }
        name={name}
        render={({field: {onChange, name, onBlur, value}}) => (
          <TextInput
            {...rest}
            onChangeText={onChange}
            onBlur={onBlur}
            value={formatValue ? formatValue(value) : value}
            error={!!errorFound}
          />
        )}
      />
      {errorFound && <ErrorText>{errorFound?.message?.toString()}</ErrorText>}
    </View>
  );
}
