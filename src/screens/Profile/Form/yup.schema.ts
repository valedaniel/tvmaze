import * as yup from 'yup';

const requiredMessage = 'Mandatory field';

export const FormProfileSchema = yup.object({
  name: yup.string().required(requiredMessage),
  email: yup.string().required(requiredMessage).email('Invalid E-mail'),
  date: yup.string().required(requiredMessage),
});
