import { IDevice } from '@/entities'

export interface IDeviceReducerState {
  detail: IDevice | null
  list: IDevice[]
}
