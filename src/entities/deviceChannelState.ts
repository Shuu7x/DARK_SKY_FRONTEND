import { IDevice } from '@/entities'

export interface IDeviceChannelState {
  id?: string
  state: string
  device: string | IDevice
  channel: string
  timestamp: Date
  topic: string
}
