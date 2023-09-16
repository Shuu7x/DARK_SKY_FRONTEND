import { IUser, userRole } from '@/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type ICreateUserForm = Omit<IUser, 'status' | 'id'> & { confirmPassword: string }

export const createUserFormSchema: yup.ObjectSchema<ICreateUserForm> = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username.')
    .min(8, 'Username must have more than 8 characters.')
    .default(''),
  password: yup
    .string()
    .required('Please enter password.')
    .min(8, 'Password must have more than 8 characters.')
    .default(''),
  confirmPassword: yup
    .string()
    .required('Please enter password confirmation.')
    .default('')
    .oneOf([yup.ref('password')], 'Password confirmation not match.'),
  role: yup.string().required('Please select user role.').default('USER').oneOf(userRole),
})

export const useCreateUserForm = () => {
  return useForm<ICreateUserForm, object>({
    defaultValues: createUserFormSchema.getDefault(),
    resolver: yupResolver(createUserFormSchema),
  })
}
