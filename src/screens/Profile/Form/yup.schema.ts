import * as yup from 'yup';

const requiredMessage = 'Campo obrigatório';

export const FormProfileSchema = yup.object({
  name: yup.string().required(requiredMessage),
  email: yup.string().required(requiredMessage).email('E-mail inválido'),
});
