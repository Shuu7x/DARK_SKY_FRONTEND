import { IDevice } from '@/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type ICreateDeviceForm = Pick<IDevice, 'no' | 'location' | 'name' | 'master'>

export const createDeviceFormSchema: yup.ObjectSchema<ICreateDeviceForm> = yup.object().shape({
  no: yup.string().required('Please enter device no.').default(''),
  name: yup.string().required('Please enter device name.').default(''),
  location: yup.string().default(''),
  master: yup.string().default(''),
})

export const useCreateDeviceForm = () => {
  return useForm<ICreateDeviceForm, object>({
    defaultValues: createDeviceFormSchema.getDefault(),
    resolver: yupResolver(createDeviceFormSchema),
  })
}
