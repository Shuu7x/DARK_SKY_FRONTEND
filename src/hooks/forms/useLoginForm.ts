import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export interface ILoginForm {
  username: string
  password: string
}

export const loginFormSchema = yup.object().shape({
  username: yup.string().required('Please enter your username.').default(''),
  password: yup.string().required('Please enter your password.').default(''),
})

export const useLoginForm = () => {
  return useForm({
    defaultValues: loginFormSchema.getDefault() as ILoginForm,
    resolver: yupResolver(loginFormSchema),
  })
}
