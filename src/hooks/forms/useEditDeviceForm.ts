import { IDevice } from '@/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type IEditDeviceForm = Pick<IDevice, 'location' | 'name' | 'master' | 'no'>

export const editDeviceFormSchema: yup.ObjectSchema<IEditDeviceForm> = yup.object().shape({
  no: yup.string().required('Please enter device no.').default(''),
  name: yup.string().required('Please enter device name.').default(''),
  location: yup.string().default(''),
  master: yup.string().default(''),
})

export const useEditDeviceForm = () => {
  return useForm<IEditDeviceForm, object>({
    defaultValues: editDeviceFormSchema.getDefault(),
    resolver: yupResolver(editDeviceFormSchema),
  })
}
