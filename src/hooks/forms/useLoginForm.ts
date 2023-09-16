import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { IUser } from '@/entities'

export type ILoginForm = Pick<IUser, 'username' | 'password'>

export const loginFormSchema: yup.ObjectSchema<ILoginForm> = yup.object().shape({
  username: yup.string().required('Please enter your username.').default(''),
  password: yup.string().required('Please enter your password.').default(''),
})

export const useLoginForm = () => {
  return useForm<ILoginForm, object>({
    defaultValues: loginFormSchema.getDefault() as ILoginForm,
    resolver: yupResolver(loginFormSchema),
  })
}
