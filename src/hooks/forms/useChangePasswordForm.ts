import { IUser } from '@/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type IChangeUserPasswordForm = Pick<IUser, 'password'> & { confirmPassword: string }

export const changeUserPasswordFormSchema: yup.ObjectSchema<IChangeUserPasswordForm> = yup
  .object()
  .shape({
    password: yup.string().required('Please enter password.').default(''),
    confirmPassword: yup
      .string()
      .required('Please enter password confirmation.')
      .default('')
      .oneOf([yup.ref('password')], 'Password confirmation not match.'),
  })

export const useChangeUserPasswordForm = () => {
  return useForm<IChangeUserPasswordForm, object>({
    defaultValues: changeUserPasswordFormSchema.getDefault(),
    resolver: yupResolver(changeUserPasswordFormSchema),
  })
}
