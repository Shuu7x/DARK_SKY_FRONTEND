import { IUser, userRole, userStatus } from '@/entities'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type IEditUserForm = Omit<IUser, 'password' | 'id'>

export const editUserFormSchema: yup.ObjectSchema<IEditUserForm> = yup.object().shape({
  username: yup.string().required().default(''),
  role: yup.string().required().default('USER').oneOf(userRole),
  status: yup.string().required().default('USER').oneOf(userStatus),
})

export const useEditUserForm = () => {
  return useForm<IEditUserForm, object>({ defaultValues: editUserFormSchema.getDefault() })
}
