import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type IControlDeviceLampForm = {
  ID: string
  STATE: string
  BRIGHT: number
  TEMP: number
}

export const controlDeviceLampFormSchema: yup.ObjectSchema<IControlDeviceLampForm> = yup
  .object()
  .shape({
    ID: yup.string().required().default(''),
    STATE: yup.string().required().default('OFF').oneOf(['ON', 'OFF']),
    BRIGHT: yup.number().required().min(0).max(100).default(0),
    TEMP: yup.number().required().min(2500).max(7000).default(2500),
  })

export const useControlDeviceLampForm = () => {
  return useForm<IControlDeviceLampForm, object>({
    defaultValues: controlDeviceLampFormSchema.getDefault(),
    resolver: yupResolver(controlDeviceLampFormSchema),
  })
}
